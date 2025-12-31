import { useQuery } from "@tanstack/react-query";
import { btrfsKeys, checkSubvolumeHealth } from "../apis";
import { useEffect, useRef } from "react";

export const useSubvolumeHealthCheck = (subvolume: string, serverUid?: string) => {
  const abortRef = useRef<AbortController | null>(null);

  const {
    data: subvolumeHealth,
    isPending: isCheckingSubvolumeHealth,
    refetch
  } = useQuery({
    queryKey: btrfsKeys.subvolumeHealth(subvolume, serverUid).queryKey,
    queryFn: () => {
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      return checkSubvolumeHealth(subvolume, serverUid, {
        signal: abortRef.current.signal
      });
    },
    enabled: !!subvolume
  });

  useEffect(() => {
    abortRef.current?.abort();
    refetch();

    return () => abortRef.current?.abort();
  }, [subvolume, serverUid, refetch]);

  return { subvolumeHealth, isCheckingSubvolumeHealth };
};
