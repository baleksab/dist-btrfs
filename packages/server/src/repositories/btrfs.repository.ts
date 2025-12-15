import { and, eq } from "drizzle-orm";
import {
  database,
  NewSubvolumeConfig,
  NewSubvolumeRetentionConfig,
  subvolumeConfigs,
  subvolumeRetentionConfigs
} from "../db";

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

    const [config] = await database.insert(subvolumeConfigs).values(data).returning();

    return config;
  }

  async setRetentionConfig(data: NewSubvolumeRetentionConfig) {
    const existing = await database
      .select()
      .from(subvolumeRetentionConfigs)
      .where(
        and(
          eq(subvolumeRetentionConfigs.serverUid, data.serverUid),
          eq(subvolumeRetentionConfigs.subvolPath, data.subvolPath)
        )
      );

    if (existing.length > 0) {
      await database
        .delete(subvolumeRetentionConfigs)
        .where(
          and(
            eq(subvolumeRetentionConfigs.serverUid, data.serverUid),
            eq(subvolumeRetentionConfigs.subvolPath, data.subvolPath)
          )
        );
    }

    const [retentionConfig] = await database
      .insert(subvolumeRetentionConfigs)
      .values(data)
      .returning();

    return retentionConfig;
  }

  async findAllRetentionConfigs(serverUid: string) {
    const retentionConfigs = await database
      .select()
      .from(subvolumeRetentionConfigs)
      .where(and(eq(subvolumeRetentionConfigs.serverUid, serverUid)));

    return retentionConfigs;
  }

  async findRetentionConfigBySubvolume(serverUid: string, subvolume: string) {
    const [retentionConfig] = await database
      .select()
      .from(subvolumeRetentionConfigs)
      .where(
        and(
          eq(subvolumeRetentionConfigs.subvolPath, subvolume),
          eq(subvolumeRetentionConfigs.serverUid, serverUid)
        )
      );

    return retentionConfig;
  }
}
