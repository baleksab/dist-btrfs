export const getPlatform = () => {
  const platform = process.platform;

  if (platform === "linux" || platform === "darwin" || platform === "win32") {
    return platform;
  }

  return "unsupported";
};