import { useQuery } from "@tanstack/react-query";
import { getAllRemoteServers, remoteServersKeys } from "../apis";

export const useRemoteServers = () => {
  const { data, isPending, isError } = useQuery({
    queryFn: getAllRemoteServers,
    queryKey: remoteServersKeys.list.queryKey
  });

  return { data, isPending, isError };
};
