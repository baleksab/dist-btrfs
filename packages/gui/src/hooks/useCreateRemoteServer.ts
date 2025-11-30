import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRemoteServer, remoteServersKeys } from "../apis";

export const useCreateRemoteServer = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: createRemoteServer, 
    onSuccess: () => { 
      queryClient.refetchQueries(remoteServersKeys.list); 
    }
  });

  return { mutateAsync, isPending, isError}; 
};