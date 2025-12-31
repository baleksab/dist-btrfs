import { useQuery } from "@tanstack/react-query";
import { btrfsKeys, getAllSubvolumes } from "../apis";

export const useSubvolumes = (serverUid?: string) => {
  const { data: subvolumes, isPending: isLoadingSubvolumes } = useQuery({
    queryKey: btrfsKeys.list(serverUid).queryKey,
    queryFn: () => getAllSubvolumes(serverUid)
  });

  return { subvolumes, isLoadingSubvolumes };
};
