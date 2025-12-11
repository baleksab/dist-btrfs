import { useMutation, useQueryClient } from "@tanstack/react-query";
import { btrfsKeys, updateSubvolumeConfig } from "../apis";
import type { BtrfsSubvolumeSetConfigRequest } from "../generated-types";

export const useUpdateSubvolumeConfig = (subvolume: string) => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateSubvolumeConfigAsync, isPending: isUpdatingSubvolumeConfig } =
    useMutation({
      mutationFn: (config: BtrfsSubvolumeSetConfigRequest) =>
        updateSubvolumeConfig(subvolume, config),
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: btrfsKeys.configList.queryKey });
      }
    });

  return { updateSubvolumeConfigAsync, isUpdatingSubvolumeConfig };
};
