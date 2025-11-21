import { getPlatform, checkForDocker } from "./utils";

const preflight = async () => {
  const platform = getPlatform();

  if (platform === "unsupported") {
    console.error(`Unsupported platform detected: ${platform}`);
    process.exit(1);
  }

  console.log(`Starting server on: ${platform}`);
  console.log("Checking for docker...");

  const docker = await checkForDocker();

  if (!docker.installed) {
    console.error("Docker is not installed.");
    process.exit(1);
  }

  if (!docker.running) {
    console.error("Docker is installed but isn't running.");
    console.error("Please start it and try again.");
    process.exit(1);
  }

  console.log("Docker is installed and running.");
};

await preflight();