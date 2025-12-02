import { useMutation } from "@tanstack/react-query";
import { createSnapshot } from "../apis";

export const useCreateSnapshot = () => {
  const {
    mutateAsync: createSnapshotAsync,
    data: createdSnapshot,
    isPending: isCreatingSnapshot
  } = useMutation({
    mutationFn: createSnapshot
  });

  return { createSnapshotAsync, createdSnapshot, isCreatingSnapshot };
};
