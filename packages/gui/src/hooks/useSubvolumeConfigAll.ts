import { useQuery } from "@tanstack/react-query";
import { btrfsKeys, getSubvolumeConfigAll } from "../apis";

export const useSubvolumeConfigAll = () => {
  const { data: subvolumeConfigs, isPending: isLoadingSubvolumeConfigs } = useQuery({
    queryFn: getSubvolumeConfigAll,
    queryKey: btrfsKeys.configList.queryKey
  });

  return { subvolumeConfigs, isLoadingSubvolumeConfigs };
};
