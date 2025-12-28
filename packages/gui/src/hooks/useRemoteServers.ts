import { useQuery } from "@tanstack/react-query";
import { getAllRemoteServers, remoteServersKeys } from "../apis";

export const useRemoteServers = () => {
  const {
    data: remoteServers,
    isPending: isLoadingRemoteServers,
    isError
  } = useQuery({
    queryFn: getAllRemoteServers,
    queryKey: remoteServersKeys.list.queryKey
  });

  return { remoteServers, isLoadingRemoteServers, isError };
};
