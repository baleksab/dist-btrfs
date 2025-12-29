import { useMutation } from "@tanstack/react-query";
import type { BtrfsSnapshotFullReplicationRequest } from "../generated-types";
import { fullReplication } from "../apis";
import { useEffect, useRef } from "react";

export const useFullReplication = (subvolume: string, snapshot: string) => {
  const abortRef = useRef<AbortController | null>(null);

  const {
    data: fullReplicationResults,
    mutateAsync,
    isPending: isFullyReplicating,
    reset
  } = useMutation({
    mutationFn: async (request: BtrfsSnapshotFullReplicationRequest) => {
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      return fullReplication(subvolume, snapshot, request, {
        signal: abortRef.current.signal
      });
    }
  });

  useEffect(() => {
    abortRef.current?.abort();
    reset();

    return () => abortRef.current?.abort();
  }, [subvolume, snapshot, reset]);

  return {
    fullReplicationResults,
    fullReplicateAsync: mutateAsync,
    isFullyReplicating
  };
};
