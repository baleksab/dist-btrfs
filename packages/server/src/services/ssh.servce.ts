import { Client } from "ssh2";
import { RemoteServer } from "../db/types";

export class SshService {
  private createConnection(server: RemoteServer): Client {
    const connection = new Client();

    connection.connect({
      host: server.ipAddress,
      port: server.port || 22,
      username: server.username,
      password: server.password,
      readyTimeout: 5000
    });

    return connection;
  }

  async checkServer(server: RemoteServer): Promise<{ uid: string; online: boolean }> {
    return new Promise((resolve) => {
      const connection = this.createConnection(server);
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

  async execCommand(
    server: RemoteServer,
    cmd: string
  ): Promise<{ stdout: string; stderr: string }> {
    return new Promise((resolve, reject) => {
      const connection = this.createConnection(server);

      connection.on("ready", () => {
        connection.exec(cmd, (err, stream) => {
          if (err) {
            reject(err);
            connection.end();
            return;
          }

          let stdout = "";
          let stderr = "";

          stream
            .on("data", (data: Buffer) => {
              stdout += data.toString();
            })
            .stderr.on("data", (data: Buffer) => {
              stderr += data.toString();
            })
            .on("close", () => {
              connection.end();
              resolve({ stdout, stderr });
            });
        });
      });

      connection.on("error", (err) => {
        reject(err);
      });
    });
  }
}
