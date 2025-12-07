import { useMutation } from "@tanstack/react-query";
import { restoreSnapshot } from "../apis";

export const useRestoreSnapshot = () => {
  const {
    mutateAsync: restoreSnapshotAsync,
    data: restorationResult,
    isPending: isRestoringSnapshot
  } = useMutation({
    mutationFn: restoreSnapshot
  });

  return { restoreSnapshotAsync, restorationResult, isRestoringSnapshot };
};
