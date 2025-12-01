import { useQuery } from "@tanstack/react-query";
import { getHealthChecks, remoteServersKeys } from "../apis";

export const useHealthChecks = () => {
  const { data } = useQuery({
    queryKey: remoteServersKeys.healthChecks.queryKey,
    queryFn: getHealthChecks,
    refetchInterval: 10_000,
    refetchIntervalInBackground: true
  });

  return { data };
};
