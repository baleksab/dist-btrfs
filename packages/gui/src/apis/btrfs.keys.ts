import { createQueryKeys } from "@lukemorales/query-key-factory";

export const btrfsKeys = createQueryKeys("btrfs", {
  all: null,
  list: null,
  config: (subvolume: string) => ({
    queryKey: ["btrfsKeys", "config", subvolume]
  })
});
