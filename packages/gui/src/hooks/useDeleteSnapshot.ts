import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSnapshot, snapshotsKeys } from "../apis";

export const useDeleteSnapshot = (subvolume: string) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteSnapshotAsync, isPending: isDeletingSnapshot } = useMutation({
    mutationFn: deleteSnapshot,
    onMutate: async ({ snapshot }) => {
      const key = snapshotsKeys.list(subvolume).queryKey;
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<any[]>(key);

      queryClient.setQueryData(key, (old: any[] | undefined) => {
        if (!old) return old;
        return old.filter((s) => s.name !== snapshot);
      });

      return { previous };
    },
    onError: (_err, _vars, context) => {
      const key = snapshotsKeys.list(subvolume).queryKey;
      if (context?.previous) {
        queryClient.setQueryData(key, context.previous);
      }
    },
    onSuccess: () => {
      const key = snapshotsKeys.list(subvolume).queryKey;
      queryClient.refetchQueries({ queryKey: key });
    }
  });

  return { deleteSnapshotAsync, isDeletingSnapshot };
};
