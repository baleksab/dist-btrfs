import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSnapshot, snapshotsKeys } from "../apis";

export const useCreateSnapshot = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: createSnapshotAsync,
    data: createdSnapshot,
    isPending: isCreatingSnapshot
  } = useMutation({
    mutationFn: createSnapshot,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: snapshotsKeys.all.queryKey });
    }
  });

  return { createSnapshotAsync, createdSnapshot, isCreatingSnapshot };
};
