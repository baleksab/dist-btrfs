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
      let finished = false;

      let handshakeTimer: any;
      let transferTimer: any;

      const log = (...args: any[]) => console.log("[SSH-PIPE]", ...args);

      const finish = (err?: any) => {
        if (finished) return;
        finished = true;

        clearTimeout(handshakeTimer);
        clearTimeout(transferTimer);

        try {
          connFrom.end();
        } catch {
          /* empty */
        }
        try {
          connTo.end();
        } catch {
          /* empty */
        }

        if (err) reject(err);
        else resolve({ stderrFrom, stderrTo });
      };

      handshakeTimer = setTimeout(() => finish(new Error("ssh handshake timeout")), 30000);

      const fail = (label: string) => (e: any) => {
        log(`${label} ERROR`, e);
        finish(e instanceof Error ? e : new Error(String(e)));
      };

      connFrom.on("error", fail("FROM-CONN"));
      connTo.on("error", fail("TO-CONN"));

      Promise.all([
        new Promise<void>((res) => connFrom.once("ready", res)),
        new Promise<void>((res) => connTo.once("ready", res))
      ])
        .then(() => {
          clearTimeout(handshakeTimer);

          transferTimer = setTimeout(
            () => finish(new Error("ssh transfer timeout")),
            5 * 60 * 1000
          );

          connFrom.exec(cmdFrom, (err, streamFrom) => {
            if (err) return finish(err);

            connTo.exec(cmdTo, {}, (err2, streamTo) => {
              if (err2) return finish(err2);

              streamFrom.stderr.on("data", (d) => (stderrFrom += d.toString()));
              streamTo.stderr.on("data", (d) => (stderrTo += d.toString()));
              streamTo.resume();
              streamFrom.pipe(streamTo, { end: true });

              let closedFrom = false;
              let closedTo = false;

              const maybeDone = () => {
                if (closedFrom && closedTo) {
                  clearTimeout(transferTimer);
                  finish();
                }
              };

              const stopFrom = (why: string) => {
                log("Stopping FROM because:", why);
                try {
                  streamFrom.destroy();
                } catch {
                  /* empty */
                }
              };

              streamTo.on("error", (e: unknown) => {
                stopFrom("TO stream error");
                finish(e);
              });

              streamTo.once("close", () => {
                closedTo = true;
                stopFrom("TO stream closed");
                maybeDone();
              });

              streamFrom.on("error", (e: unknown) => finish(e));

              streamFrom.once("close", () => {
                closedFrom = true;
                maybeDone();
              });

              connFrom.once("close", () => {
                closedFrom = true;
                maybeDone();
              });

              connTo.once("close", () => {
                closedTo = true;
                maybeDone();
              });
            });
          });
        })
        .catch(finish);
    });
  }
}
