import { useQuery } from "@tanstack/react-query";
import { btrfsKeys, getSubvolumeRetentionConfigAll } from "../apis";

export const useSubvolumeRetentionConfigAll = () => {
  const { data: subvolumeRetentionConfigs, isPending: isLoadingSubvolumeRetentionConfigs } =
    useQuery({
      queryFn: getSubvolumeRetentionConfigAll,
      queryKey: btrfsKeys.retentionConfigList.queryKey
    });

  return { subvolumeRetentionConfigs, isLoadingSubvolumeRetentionConfigs };
};
