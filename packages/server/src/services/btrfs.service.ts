import { RemoteServerService } from "./remoteServer.service";
import { SshService } from "./ssh.servce";

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

    const cmd = "sudo btrfs subvolume list -o /";

    const { stdout, stderr } = await this.sshService.execCommand(server, cmd);

    if (stderr && stderr.trim().length > 0) {
      console.warn("btrfs subvolume list stderr:", stderr);
    }

    const lines = stdout.trim().split("\n");
    const results: BtrfsSubvolume[] = [];

    // ID 258 gen 551 top level 5 path data
    const regex = /ID\s+(\d+)\s+gen\s+(\d+)\s+top level\s+(\d+)\s+path\s+(.+)$/;

    for (const line of lines) {
      const match = line.match(regex);
      if (!match) continue;

      const [, id, gen, topLevel, path] = match;

      results.push({
        id: Number(id),
        gen: Number(gen),
        topLevel: Number(topLevel),
        path: path.trim()
      });
    }

    return results;
  }
}
