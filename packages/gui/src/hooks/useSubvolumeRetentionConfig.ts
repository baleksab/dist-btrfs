import { useQuery } from "@tanstack/react-query";
import { btrfsKeys, getSubvolumeRetentionConfig } from "../apis";

export const useSubvolumeRetentionConfig = (subvolume: string) => {
  const { data: subvolumeRetentionConfig, isPending: isLoadingSubvolumeRetentionConfigs } =
    useQuery({
      queryFn: () => getSubvolumeRetentionConfig(subvolume),
      queryKey: btrfsKeys.retentionConfig(subvolume).queryKey,
      enabled: !!subvolume
    });

  return { subvolumeRetentionConfig, isLoadingSubvolumeRetentionConfigs };
};
