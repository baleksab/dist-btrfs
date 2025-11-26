export const isPlatformSupported = () => {
  const platform = process.platform;

  if (platform === "linux" || platform === "win32" || platform === "darwin") {
    return true;
  }

  return false;
};