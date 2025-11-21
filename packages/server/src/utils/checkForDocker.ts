import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

type DockerStatus =
  | { installed: false; running: false }
  | { installed: true; running: boolean };

export const checkForDocker = async (): Promise<DockerStatus> => {
  try {
    await execAsync("docker --version");

    try {
      await execAsync("docker info");
      return { installed: true, running: true };
    } catch {
      return { installed: true, running: false };
    }
  } catch {
    return { installed: false, running: false };
  }
};
