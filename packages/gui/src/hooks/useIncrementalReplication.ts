import { useMutation } from "@tanstack/react-query";
import type { BtrfsSnapshotIncrementalReplicationRequest } from "../generated-types";
import { useEffect, useRef } from "react";
import { incrementalReplication } from "../apis";

export const useIncrementalReplication = (subvolume: string, snapshot: string) => {
  const abortRef = useRef<AbortController | null>(null);

  const {
    data: incrementalReplicationResults,
    mutateAsync,
    isPending: isIncrementallyReplicating,
    reset
  } = useMutation({
    mutationFn: async (request: BtrfsSnapshotIncrementalReplicationRequest) => {
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      return incrementalReplication(subvolume, snapshot, request, {
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
    incrementalReplicationResults,
    incrementallyReplicateAsync: mutateAsync,
    isIncrementallyReplicating
  };
};
