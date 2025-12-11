import { and, eq } from "drizzle-orm";
import { database, NewSubvolumeConfig, subvolumeConfigs } from "../db";

export class BtrfsRepository {
  async findConfigBySubvolume(serverUid: string, subvolume: string) {
    const [subvolumeConfig] = await database
      .select()
      .from(subvolumeConfigs)
      .where(
        and(eq(subvolumeConfigs.subvolPath, subvolume), eq(subvolumeConfigs.serverUid, serverUid))
      );

    return subvolumeConfig;
  }

  async findAllConfigs(serverUid: string) {
    const configs = await database
      .select()
      .from(subvolumeConfigs)
      .where(and(eq(subvolumeConfigs.serverUid, serverUid)));

    return configs;
  }

  async setConfig(data: NewSubvolumeConfig) {
    const existing = await database
      .select()
      .from(subvolumeConfigs)
      .where(
        and(
          eq(subvolumeConfigs.serverUid, data.serverUid),
          eq(subvolumeConfigs.subvolPath, data.subvolPath)
        )
      );

    if (existing.length > 0) {
      await database
        .delete(subvolumeConfigs)
        .where(
          and(
            eq(subvolumeConfigs.serverUid, data.serverUid),
            eq(subvolumeConfigs.subvolPath, data.subvolPath)
          )
        );
    }

    const [snapshot] = await database.insert(subvolumeConfigs).values(data).returning();

    return snapshot;
  }
}
