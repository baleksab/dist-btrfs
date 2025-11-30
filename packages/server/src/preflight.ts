import { isPlatformSupported } from "./utils";

if (!isPlatformSupported()) {
  console.error("Unsupported platform detected, stopping the server!");
  process.exit(1);
}

console.log("Supported platform detected");
