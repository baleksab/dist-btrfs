import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRemoteServer } from "../apis";

export const useUpdateRemoteServer = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateRemoteServer,
    onSuccess: () => {
      queryClient.refetchQueries();
    }
  });

  return { mutateAsync, isPending };
};
