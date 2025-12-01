import { Client } from "ssh2";
import { RemoteServer } from "../db/types";

export class SshService {
  async checkServer(server: RemoteServer): Promise<{ uid: string; online: boolean }> {
    return new Promise((resolve) => {
      const connection = new Client();
      const port = server.port ?? 22;

      connection
        .on("ready", () => {
          connection.end();
          resolve({ uid: server.uid, online: true });
        })
        .on("error", () => {
          resolve({ uid: server.uid, online: false });
        })
        .connect({
          host: server.ipAddress,
          port,
          username: server.username,
          password: server.password,
          readyTimeout: 5000
        });
    });
  }

  async checkAllServers(servers: RemoteServer[]) {
    return Promise.all(servers.map((srv) => this.checkServer(srv)));
  }
}
