import { useQuery } from "@tanstack/react-query";
import { snapshotHealthCheck, snapshotsKeys } from "../apis";

export const useSnapshotsHealth = (subvolume: string, snapshot: string) => {
  const { data: snapshotsHealth, isPending: isCheckingSnapshotsHealth } = useQuery({
    queryKey: snapshotsKeys.health(subvolume, snapshot).queryKey,
    queryFn: () => snapshotHealthCheck(subvolume, snapshot),
    enabled: !!subvolume && !!snapshot
  });

  return {
    snapshotsHealth,
    isCheckingSnapshotsHealth
  };
};
