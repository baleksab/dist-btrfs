import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRemoteServer, remoteServersKeys } from "../apis";

export const useDeleteRemoteServer = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteRemoteServer,
    onSuccess: () => {
      queryClient.refetchQueries(remoteServersKeys.list);
    }
  });

  return { mutateAsync, isPending };
};
