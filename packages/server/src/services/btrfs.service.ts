import { RemoteServerService } from "./remoteServer.service";
import { SshService } from "./ssh.service";

export type BtrfsSubvolume = {
  id: number;
  gen: number;
  topLevel: number;
  path: string;
};

export class BtrfsService {
  private remoteServerService = new RemoteServerService();
  private sshService = new SshService();

  async listSubvolumes() {
    const server = await this.remoteServerService.getPrimaryServerUnsanitized();

    const cmd = "sudo btrfs subvolume list /";
    const { stdout, stderr } = await this.sshService.execCommand(server, cmd);

    if (stderr && stderr.trim().length > 0) {
      console.warn("btrfs subvolume list stderr:", stderr);
    }

    const lines = stdout.trim().split("\n");
    const results: BtrfsSubvolume[] = [];

    const regex = /ID\s+(\d+)\s+gen\s+(\d+)\s+top level\s+(\d+)\s+path\s+(.+)/;

    for (const line of lines) {
      const match = line.match(regex);

      if (!match) {
        continue;
      }

      const [, id, gen, topLevel, relPath] = match;

      if (relPath.includes(".snapshots/")) {
        continue;
      }

      const absPath = relPath === "root" ? "/" : "/" + relPath.replace(/^root\//, "");

      results.push({
        id: Number(id),
        gen: Number(gen),
        topLevel: Number(topLevel),
        path: absPath
      });
    }

    return results;
  }
}
