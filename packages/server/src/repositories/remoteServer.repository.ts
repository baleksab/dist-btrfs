import { eq } from "drizzle-orm";
import { database, remoteServers, NewRemoteServer, UpdateRemoteServer } from "../db";

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

  async update(uid: string, data: UpdateRemoteServer) {
    const [server] = await database
      .update(remoteServers)
      .set(data)
      .where(eq(remoteServers.uid, uid))
      .returning();

    return server;
  }

  async findPrimary() {
    const [server] = await database
      .select()
      .from(remoteServers)
      .where(eq(remoteServers.isPrimary, 1));

    return server;
  }
}
