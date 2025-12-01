import { createQueryKeys } from "@lukemorales/query-key-factory";

export const remoteServersKeys = createQueryKeys("remoteServers", {
  all: null,
  list: null,
  healthChecks: null
});
