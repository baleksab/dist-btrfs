import { useQuery } from "@tanstack/react-query";
import { getSnapshots, snapshotsKeys } from "../apis";

export const useSnapshots = (subvolume: string, serverUid?: string) => {
  const { data: snapshots, isPending: isLoadingSnapshots } = useQuery({
    queryKey: snapshotsKeys.list(subvolume, serverUid).queryKey,
    queryFn: () => getSnapshots(subvolume, serverUid),
    enabled: !!subvolume,
    refetchInterval: 10_000,
    refetchIntervalInBackground: true
  });

  return { snapshots, isLoadingSnapshots };
};
