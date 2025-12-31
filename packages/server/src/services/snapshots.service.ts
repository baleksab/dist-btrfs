import path from "path";
import {
  BtrfsSnapshotCleanupRequest,
  BtrfsSnapshotFullReplicationRequest,
  ReplicationResult
} from "../dtos";
import { getISOWeek } from "../utils";
import { RemoteServerService } from "./remoteServer.service";
import { SshService } from "./ssh.service";

export class SnapshotsService {
  private remoteServerService = new RemoteServerService();
  private sshService = new SshService();

  private getSubvolName(subvolPath: string) {
    return subvolPath.replace(/^\//, "");
  }

  private getSnapshotsDir(subvolPath: string) {
    const name = this.getSubvolName(subvolPath);
    return `/.snapshots/${name}`;
  }

  async listSnapshots(subvolPath: string, serverUid?: string) {
    const server = serverUid
      ? await this.remoteServerService.getServerUnsanitized(serverUid)
      : await this.remoteServerService.getPrimaryServerUnsanitized();

    const snapshotsDir = this.getSnapshotsDir(subvolPath);

    const listCmd = `sudo btrfs subvolume list -o ${snapshotsDir}`;
    const { stdout: listOut } = await this.sshService.execCommand(server, listCmd);

    const rows = listOut
      .trim()
      .split("\n")
      .filter((l) => l.includes(snapshotsDir));

    const snapshots = [];

    for (const row of rows) {
      const parts = row.trim().split(/\s+/);
      const pathIndex = parts.indexOf("path") + 1;
      const relative = parts.slice(pathIndex).join(" ").trim();

      const relativeClean = relative.replace(/^root\//, "");

      const fullPath = "/" + relativeClean;
      const name = fullPath.split("/").pop();

      const { stdout: showOut } = await this.sshService.execCommand(
        server,
        `sudo btrfs subvolume show ${fullPath}`
      );

      const creationRegex = /Creation time:\s+(.+)/;
      const creationLine = showOut.split("\n").find((line) => creationRegex.test(line));
      const createdAt = creationLine
        ? new Date(creationLine.replace("Creation time:", "").trim()).toISOString()
        : undefined;

      const { stdout: duOut } = await this.sshService.execCommand(
        server,
        `sudo btrfs subvolume du -s ${fullPath}`
      );

      const sizeBytes = Number(duOut.trim().split(/\s+/)[0]);

      snapshots.push({
        name,
        path: fullPath,
        createdAt,
        sizeBytes
      });
    }

    snapshots.sort((a, b) => {
      if (!a.createdAt && !b.createdAt) return 0;
      if (!a.createdAt) return 1;
      if (!b.createdAt) return -1;

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return snapshots;
  }

  async createSnapshot(subvolPath: string) {
    const server = await this.remoteServerService.getPrimaryServerUnsanitized();

    const snapshotsDir = this.getSnapshotsDir(subvolPath);
    await this.sshService.execCommand(server, `sudo mkdir -p ${snapshotsDir}`);

    const name = new Date().toISOString();
    const fullPath = `${snapshotsDir}/${name}`;

    await this.sshService.execCommand(
      server,
      `sudo btrfs subvolume snapshot -r ${subvolPath} ${fullPath}`
    );

    return { name, path: fullPath };
  }

  async deleteSnapshot(snapshotPath: string) {
    const server = await this.remoteServerService.getPrimaryServerUnsanitized();

    const { stderr: checkErr } = await this.sshService.execCommand(
      server,
      `sudo btrfs subvolume show ${snapshotPath}`
    );

    if (checkErr && checkErr.includes("ERROR")) {
      throw new Error(`Snapshot does not exist: ${snapshotPath}`);
    }

    const { stdout: delOut, stderr: delErr } = await this.sshService.execCommand(
      server,
      `sudo btrfs subvolume delete ${snapshotPath}`
    );

    if (delErr && delErr.trim().length > 0) {
      console.warn("btrfs delete stderr:", delErr);
    }

    return {
      deleted: true,
      path: snapshotPath,
      message: delOut.trim() || "Snapshot deleted."
    };
  }

  async restoreSnapshot(subvolPath: string, snapshot: string) {
    const server = await this.remoteServerService.getPrimaryServerUnsanitized();

    const snapshotsDir = this.getSnapshotsDir(subvolPath);
    const snapshotPath = `${snapshotsDir}/${snapshot}`;

    const { stderr: checkSnapErr } = await this.sshService.execCommand(
      server,
      `sudo btrfs subvolume show ${snapshotPath}`
    );
    if (checkSnapErr && checkSnapErr.includes("ERROR")) {
      throw new Error(`Snapshot does not exist: ${snapshotPath}`);
    }

    await this.sshService.execCommand(server, `sudo btrfs subvolume delete ${subvolPath}`);

    await this.sshService.execCommand(
      server,
      `sudo btrfs subvolume snapshot ${snapshotPath} ${subvolPath}`
    );

    return {
      restored: true,
      snapshotUsed: snapshotPath,
      newSubvolume: subvolPath
    };
  }

  async cleanupSnapshots(subvolumePath: string, request: BtrfsSnapshotCleanupRequest) {
    const server = await this.remoteServerService.getPrimaryServerUnsanitized();
    const snapshotsDir = this.getSnapshotsDir(subvolumePath);

    const { stdout: listOut } = await this.sshService.execCommand(
      server,
      `sudo btrfs subvolume list -o ${snapshotsDir}`
    );

    const rows = listOut
      .trim()
      .split("\n")
      .filter((l) => l.includes(snapshotsDir));

    const snapshots: { path: string; date: Date }[] = [];

    for (const row of rows) {
      const parts = row.trim().split(/\s+/);
      const pathIndex = parts.indexOf("path") + 1;

      let relative = parts.slice(pathIndex).join(" ").trim();
      relative = relative.replace(/^root\//, "");

      const fullPath = "/" + relative;
      const name = fullPath.split("/").pop()!;

      const date = new Date(name);

      if (!isNaN(date.getTime())) {
        snapshots.push({ path: fullPath, date });
      }
    }

    snapshots.sort((a, b) => b.date.getTime() - a.date.getTime());

    let groupKeyFn: (d: Date) => string;

    if (request.type === "daily") {
      groupKeyFn = (d) => d.toISOString().split("T")[0];
    } else if (request.type === "weekly") {
      groupKeyFn = (d) => `${d.getFullYear()}-W${getISOWeek(d)}`;
    } else {
      groupKeyFn = (d) => `${d.getFullYear()}-${d.getMonth() + 1}`;
    }

    const groups: Record<string, { path: string; date: Date }[]> = {};

    for (const snap of snapshots) {
      const key = groupKeyFn(snap.date);
      if (!groups[key]) groups[key] = [];
      groups[key].push(snap);
    }

    const sortedGroupKeys = Object.keys(groups).sort((a, b) => {
      const da = groups[a][0].date.getTime();
      const db = groups[b][0].date.getTime();
      return db - da;
    });

    const toDelete: string[] = [];
    const kept: string[] = [];

    for (const key of sortedGroupKeys) {
      groups[key].sort((a, b) => b.date.getTime() - a.date.getTime());

      const keep = groups[key].slice(0, request.keep);
      const del = groups[key].slice(request.keep);

      kept.push(...keep.map((s) => s.path));
      toDelete.push(...del.map((s) => s.path));
    }

    const deleted: string[] = [];

    for (const snapPath of toDelete) {
      const { stderr } = await this.sshService.execCommand(
        server,
        `sudo btrfs subvolume delete ${snapPath}`
      );

      if (!stderr || !stderr.includes("ERROR")) {
        deleted.push(snapPath);
      }
    }

    return {
      cleaned: true,
      kept,
      deletedSnapshots: deleted,
      totalBefore: snapshots.length,
      totalAfter: kept.length
    };
  }

  async fullReplication(snapshotPath: string, request: BtrfsSnapshotFullReplicationRequest) {
    const primary = await this.remoteServerService.getPrimaryServerUnsanitized();

    const secondaryServers = await this.remoteServerService.getServersUnsanitized(
      request.secondaryServers.filter((uid) => uid !== primary.uid)
    );

    if (secondaryServers.length === 0) {
      throw new Error("No valid secondary servers provided.");
    }

    const { stderr: checkErr } = await this.sshService.execCommand(
      primary,
      `sudo btrfs subvolume show ${snapshotPath}`
    );

    if (checkErr && checkErr.includes("ERROR")) {
      throw new Error(`Snapshot does not exist on primary: ${snapshotPath}`);
    }

    const results: ReplicationResult[] = [];

    const parentDir = path.posix.dirname(snapshotPath);

    for (const srv of secondaryServers) {
      try {
        await this.sshService.execCommand(srv, `sudo mkdir -p ${parentDir}`);

        const leaf = snapshotPath.substring(snapshotPath.lastIndexOf("/") + 1);
        const targetPath = `${parentDir}/${leaf}`;

        const { stderr } = await this.sshService.execCommand(
          srv,
          `sudo btrfs subvolume show ${targetPath} >/dev/null 2>&1 && sudo btrfs subvolume delete ${targetPath} || true`
        );

        const { stderrFrom, stderrTo } = await this.sshService.execPipe(
          primary,
          `sudo btrfs send ${snapshotPath}`,
          srv,
          `sudo btrfs receive ${parentDir}`
        );

        if (stderrFrom?.trim()) {
          console.warn(`Replication stderr (send:${primary.uid}):`, stderrFrom);
        }

        if (stderrTo?.trim()) {
          console.warn(`Replication stderr (receive:${srv.uid}):`, stderrTo);
        }

        if (
          stderrTo?.includes("ERROR") ||
          stderrFrom?.includes("ERROR") ||
          stderr?.includes("ERROR")
        ) {
          results.push({
            serverUid: srv.uid,
            status: "failed",
            error: (stderrTo || stderrFrom || stderr)?.trim(),
            address: srv.ipAddress,
            port: srv.port || 22
          });
        } else {
          results.push({
            serverUid: srv.uid,
            status: "ok",
            address: srv.ipAddress,
            port: srv.port || 22
          });
        }
      } catch (err: any) {
        results.push({
          serverUid: srv.uid,
          status: "failed",
          error: err?.message ?? String(err),
          address: srv.ipAddress,
          port: srv.port || 22
        });
      }
    }

    return {
      snapshotPath,
      results
    };
  }
}
