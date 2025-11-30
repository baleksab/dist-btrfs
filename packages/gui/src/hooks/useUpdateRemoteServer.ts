import { useMutation, useQueryClient } from "@tanstack/react-query";
import { remoteServersKeys, updateRemoteServer } from "../apis";

export const useUpdateRemoteServer = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateRemoteServer,
    onSuccess: () => {
      queryClient.refetchQueries(remoteServersKeys.list);
    }
  });

  return { mutateAsync, isPending };
};
