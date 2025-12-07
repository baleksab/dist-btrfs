import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cleanupSnapshots, snapshotsKeys } from "../apis";
import type { BtrfsSnapshotCleanupRequest } from "../generated-types";

export const useSnapshotsCleanup = (subvolume: string) => {
  const queryClient = useQueryClient();

  const { mutateAsync: cleanupSnapshotsAsync, isPending: isCleaningupSnapshots } = useMutation({
    mutationFn: (request: BtrfsSnapshotCleanupRequest) => cleanupSnapshots(subvolume, request),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: snapshotsKeys.list(subvolume).queryKey });
    }
  });

  return { cleanupSnapshotsAsync, isCleaningupSnapshots };
};
