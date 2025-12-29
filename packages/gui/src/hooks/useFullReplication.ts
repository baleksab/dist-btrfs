import { useMutation } from "@tanstack/react-query";
import type { BtrfsSnapshotFullReplicationRequest } from "../generated-types";
import { fullReplication } from "../apis";

export const useFullReplication = (subvolume: string, snapshot: string) => {
  const { mutateAsync: fullReplicateAsync, isPending: isFullyReplicating } = useMutation({
    mutationFn: (request: BtrfsSnapshotFullReplicationRequest) =>
      fullReplication(subvolume, snapshot, request)
  });

  return { fullReplicateAsync, isFullyReplicating };
};
