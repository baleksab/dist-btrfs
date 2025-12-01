import { Client } from "ssh2";
import { RemoteServer } from "../db/types";

type SshCredentials = Pick<RemoteServer, "uid" | "ipAddress" | "port" | "username" | "password">;

export class SshService {
  private createConnection(credentials: SshCredentials): Client {
    const connection = new Client();

    connection.connect({
      host: credentials.ipAddress,
      port: credentials.port || 22,
      username: credentials.username,
      password: credentials.password,
      readyTimeout: 5000
    });

    return connection;
  }

  async checkServer(credentials: SshCredentials): Promise<{ uid: string; online: boolean }> {
    return new Promise((resolve) => {
      const connection = this.createConnection(credentials);

      connection
        .on("ready", () => {
          connection.end();
          resolve({ uid: credentials.uid, online: true });
        })
        .on("error", () => {
          resolve({ uid: credentials.uid, online: false });
        });
    });
  }

  async checkAllServers(credentials: SshCredentials[]) {
    return Promise.all(credentials.map((creds) => this.checkServer(creds)));
  }

  async execCommand(
    credentials: SshCredentials,
    cmd: string
  ): Promise<{ stdout: string; stderr: string }> {
    return new Promise((resolve, reject) => {
      const connection = this.createConnection(credentials);

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
