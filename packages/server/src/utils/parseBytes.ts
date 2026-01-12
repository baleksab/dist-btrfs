export const parseBytes = (value: number, unit: string) => {
  switch (unit) {
    case "TiB":
      return value * 1024 ** 4;
    case "GiB":
      return value * 1024 ** 3;
    case "MiB":
      return value * 1024 ** 2;
    case "KiB":
      return value * 1024;
    case "B":
    default:
      return value;
  }
};
