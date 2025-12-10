import { useQuery } from "@tanstack/react-query";
import { btrfsKeys, getSubvolumeConfig } from "../apis";

export const useSubvolumeConfig = (subvolume: string) => {
  const { data: subvolumeConfig, isPending: isLoadingSubvolumeConfig } = useQuery({
    queryFn: () => getSubvolumeConfig(subvolume),
    queryKey: btrfsKeys.config(subvolume).queryKey,
    enabled: !!subvolume
  });

  return { subvolumeConfig, isLoadingSubvolumeConfig };
};
