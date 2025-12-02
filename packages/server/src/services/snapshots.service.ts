import { RemoteServerService } from "./remoteServer.service";
import { SshService } from "./ssh.service";

export class SnapshotsService {
  private remoteServerService = new RemoteServerService();
  private sshService = new SshService();

  async listSnapshots(subvolPath: string) {
    const server = await this.remoteServerService.getPrimaryServerUnsanitized();

    const listCmd = `ls ${subvolPath}/snapshots`;
    const { stdout: listOut } = await this.sshService.execCommand(server, listCmd);

    const names = listOut
      .trim()
      .split("\n")
      .filter((line) => line.length > 0);

    console.log(names);

    const snapshots = [];

    for (const name of names) {
      const fullPath = `${subvolPath}/snapshots/${name}`;

      const showCmd = `sudo btrfs subvolume show ${fullPath}`;
      const { stdout: showOut } = await this.sshService.execCommand(server, showCmd);

      let createdAt: string | undefined = undefined;
      const creationRegex = /Creation time:\s+(.+)/;

      const creationMatch = showOut.split("\n").find((line) => creationRegex.test(line));

      if (creationMatch) {
        const rawTime = creationMatch.replace("Creation time:", "").trim();
        const iso = new Date(rawTime).toISOString();
        createdAt = iso;
      }

      const duCmd = `sudo btrfs subvolume du -s ${fullPath}`;
      const { stdout: duOut } = await this.sshService.execCommand(server, duCmd);

      const sizeMatch = duOut.trim().split(/\s+/)[0];
      const sizeBytes = Number(sizeMatch);

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

    const name = new Date().toISOString().replace(/[:.]/g, "_");
    const fullPath = `${subvolPath}/snapshots/${name}`;
    const cmd = `sudo btrfs subvolume snapshot ${subvolPath} ${fullPath}`;

    await this.sshService.execCommand(server, cmd);

    return {
      name,
      path: fullPath
    };
  }
}
