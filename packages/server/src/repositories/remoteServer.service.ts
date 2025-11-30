import { database, remoteServers, NewRemoteServer } from "../db";

export class RemoteServerRepository {
  async create(data: NewRemoteServer) {
    const [server] = await database.insert(remoteServers).values(data).returning();
    return server;
  }

  async findAll() {
    return database.select().from(remoteServers);
  }
}
