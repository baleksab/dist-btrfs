import { useMutation, useQueryClient } from "@tanstack/react-query";
import { btrfsKeys, updateSubvolumeRetentionConfig } from "../apis";
import type { BtrfsSubvolumeSetRetentionConfigRequest } from "../generated-types";

export const useUpdateSubvolumeRetentionConfig = (subvolume: string) => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: updateSubvolumeRetentionConfigAsync,
    isPending: isUpdatingSubvolumeRetentionConfig
  } = useMutation({
    mutationFn: (config: BtrfsSubvolumeSetRetentionConfigRequest) =>
      updateSubvolumeRetentionConfig(subvolume, config),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: btrfsKeys.retentionConfigList.queryKey });
    }
  });

  return { updateSubvolumeRetentionConfigAsync, isUpdatingSubvolumeRetentionConfig };
};
