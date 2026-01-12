import { useQuery } from "@tanstack/react-query";
import { btrfsKeys, getSubvolumeStorageMetrics } from "../apis";

export const useSubvolumeStorageMetrics = (
  subvolume: string,
  serverUid?: string,
  skip?: boolean
) => {
  const { data: subvolumeStorageMetrics, isPending: isLoadingSubvolumeStorageMetrics } = useQuery({
    queryKey: btrfsKeys.subvolumeStorageMetrics(subvolume, serverUid).queryKey,
    queryFn: () => getSubvolumeStorageMetrics(subvolume, serverUid),
    enabled: !skip && !!subvolume
  });

  return { subvolumeStorageMetrics, isLoadingSubvolumeStorageMetrics };
};
