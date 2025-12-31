import { createQueryKeys } from "@lukemorales/query-key-factory";

export const btrfsKeys = createQueryKeys("btrfs", {
  all: null,
  list: (serverUid?: string) => ({
    queryKey: ["btrfsKeys", "list", serverUid]
  }),
  config: (subvolume: string) => ({
    queryKey: ["btrfsKeys", "config", subvolume]
  }),
  configList: null,
  retentionConfigList: null,
  retentionConfig: (subvolume: string) => ({
    queryKey: ["btrfsKeys", "retentionConfig", subvolume]
  })
});
