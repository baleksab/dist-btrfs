import { useQuery } from "@tanstack/react-query";
import { getSnapshots, snapshotsKeys } from "../apis";

export const useSnapshots = (subvolume: string) => {
  const { data: snapshots, isPending: isLoadingSnapshots } = useQuery({
    queryKey: snapshotsKeys.list(subvolume).queryKey,
    queryFn: () => getSnapshots(subvolume),
    enabled: !!subvolume,
    refetchInterval: 10_000,
    refetchIntervalInBackground: true
  });

  return { snapshots, isLoadingSnapshots };
};
