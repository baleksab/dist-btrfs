import { database, remoteServers, NewRemoteServer } from "../db";

export const createNewServer = async (data: NewRemoteServer) => {
  const [server] = await database.insert(remoteServers).values(data).returning();

  return server;
};

export const getAllServers = async () => {
  const servers = await database.select().from(remoteServers);

  return servers;
};
