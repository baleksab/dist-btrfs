import { createQueryKeys } from "@lukemorales/query-key-factory";

export const snapshotsKeys = createQueryKeys("snapshotsKeys", {
  all: null,
  list: (subvolume: string, serverUid?: string) => ({
    queryKey: ["snapshotsKeys", "list", subvolume, serverUid]
  })
});
