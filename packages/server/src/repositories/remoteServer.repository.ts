import { eq } from "drizzle-orm";
import { database, remoteServers, NewRemoteServer } from "../db";

export class RemoteServerRepository {
  async create(data: NewRemoteServer) {
    const [server] = await database.insert(remoteServers).values(data).returning();
    return server;
  }

  findAll() {
    return database.select().from(remoteServers);
  }

  delete(uid: string) {
    return database.delete(remoteServers).where(eq(remoteServers.uid, uid));
  }
}
