import { useQuery } from "@tanstack/react-query";
import { btrfsKeys, getAllSubvolumes } from "../apis";

export const useSubvolumes = () => {
  const { data: subvolumes, isPending: isLoadingSubvolumes } = useQuery({
    queryKey: btrfsKeys.list.queryKey,
    queryFn: getAllSubvolumes
  });

  return { subvolumes, isLoadingSubvolumes };
};
