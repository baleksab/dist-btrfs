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

  async listSnapshots(subvolPath: string) {
    const server = await this.remoteServerService.getPrimaryServerUnsanitized();

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

    return snapshots;
  }

  async createSnapshot(subvolPath: string) {
    const server = await this.remoteServerService.getPrimaryServerUnsanitized();

    const snapshotsDir = this.getSnapshotsDir(subvolPath);
    await this.sshService.execCommand(server, `sudo mkdir -p ${snapshotsDir}`);

    const name = new Date().toISOString().replace(/[:.]/g, "_");
    const fullPath = `${snapshotsDir}/${name}`;

    await this.sshService.execCommand(
      server,
      `sudo btrfs subvolume snapshot ${subvolPath} ${fullPath}`
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
}
