import { RemoteServerService } from "./remoteServer.service";
import { SshService } from "./ssh.service";

export class SnapshotsService {
  private remoteServerService = new RemoteServerService();
  private sshService = new SshService();

  async listSnapshots(subvolPath: string) {
    const server = await this.remoteServerService.getPrimaryServerUnsanitized();
    const snapshotsDir = `${subvolPath}/snapshots`;

    const listCmd = `sudo btrfs subvolume list -o ${snapshotsDir}`;
    const { stdout: listOut } = await this.sshService.execCommand(server, listCmd);

    const rows = listOut
      .trim()
      .split("\n")
      .filter((l) => l.includes(snapshotsDir));

    const snapshots = [];

    for (const row of rows) {
      // ID 123 gen 456 top level 5 path subvol/snapshots/snap1
      const parts = row.trim().split(/\s+/);
      const pathIndex = parts.indexOf("path") + 1;
      const fullPath = parts.slice(pathIndex).join(" ");
      const name = fullPath.split("/").pop();

      const showCmd = `sudo btrfs subvolume show ${fullPath}`;
      const { stdout: showOut } = await this.sshService.execCommand(server, showCmd);

      const creationRegex = /Creation time:\s+(.+)/;
      const creationLine = showOut.split("\n").find((line) => creationRegex.test(line));
      const createdAt = creationLine
        ? new Date(creationLine.replace("Creation time:", "").trim()).toISOString()
        : undefined;

      const duCmd = `sudo btrfs subvolume du -s ${fullPath}`;
      const { stdout: duOut } = await this.sshService.execCommand(server, duCmd);

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

    const snapshotsDir = `${subvolPath}/snapshots`;
    await this.sshService.execCommand(server, `sudo mkdir -p ${snapshotsDir}`);

    const name = new Date().toISOString().replace(/[:.]/g, "_");
    const fullPath = `${snapshotsDir}/${name}`;
    const cmd = `sudo btrfs subvolume snapshot ${subvolPath} ${fullPath}`;

    await this.sshService.execCommand(server, cmd);

    return {
      name,
      path: fullPath
    };
  }
}
