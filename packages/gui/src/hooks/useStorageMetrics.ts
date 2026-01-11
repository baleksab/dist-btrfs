import { useQuery } from "@tanstack/react-query";
import { btrfsKeys, getStorageMetrics } from "../apis";

export const useStorageMetrics = (serverUid?: string, skip?: boolean) => {
  const { data: storageMetrics, isPending: isLoadingStorageMetrics } = useQuery({
    queryKey: btrfsKeys.storageMetrics(serverUid).queryKey,
    queryFn: () => getStorageMetrics(serverUid),
    enabled: !skip
  });

  return { storageMetrics, isLoadingStorageMetrics };
};
