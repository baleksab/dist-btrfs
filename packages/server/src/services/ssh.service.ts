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

  async execPipe(
    from: SshCredentials,
    cmdFrom: string,
    to: SshCredentials,
    cmdTo: string
  ): Promise<{ stderrFrom: string; stderrTo: string }> {
    const connFrom = this.createConnection(from);
    const connTo = this.createConnection(to);

    return new Promise((resolve, reject) => {
      let stderrFrom = "";
      let stderrTo = "";

      connFrom.on("ready", () => {
        connTo.on("ready", () => {
          connFrom.exec(cmdFrom, (err, streamFrom) => {
            if (err) return reject(err);

            connTo.exec(cmdTo, (err2, streamTo) => {
              if (err2) return reject(err2);

              streamFrom.pipe(streamTo);

              streamFrom.stderr.on("data", (d: Buffer) => {
                stderrFrom += d.toString();
              });

              streamTo.stderr.on("data", (d: Buffer) => {
                stderrTo += d.toString();
              });

              let closedFrom = false;
              let closedTo = false;

              const maybeFinish = () => {
                if (closedFrom && closedTo) {
                  connFrom.end();
                  connTo.end();
                  resolve({ stderrFrom, stderrTo });
                }
              };

              streamFrom.on("close", () => {
                closedFrom = true;
                maybeFinish();
              });

              streamTo.on("close", () => {
                closedTo = true;
                maybeFinish();
              });
            });
          });
        });

        connTo.on("error", reject);
      });

      connFrom.on("error", reject);
    });
  }
}
