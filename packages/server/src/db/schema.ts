import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const remoteServers = sqliteTable("remote_servers", {
  uid: text("uid").primaryKey(),
  name: text("name").notNull(),
  ipAddress: text("ip_address").notNull(),
  port: integer("port").default(22),
  username: text("username").notNull(),
  password: text("password").notNull(),
  isPrimary: integer("is_primary").notNull().default(0)
});

export const subvolumeConfigs = sqliteTable("subvolume_config", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  serverUid: text("server_uid")
    .notNull()
    .references(() => remoteServers.uid, { onDelete: "cascade" }),
  subvolPath: text("subvol_path").notNull(),
  snapshotIntervalSeconds: integer("snapshot_interval_seconds").notNull().default(3600),
  isEnabled: integer("is_enabled").notNull().default(0)
});

export const subvolumeRetentionConfigs = sqliteTable("subvolume_retention_config", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  serverUid: text("server_uid")
    .notNull()
    .references(() => remoteServers.uid, { onDelete: "cascade" }),
  subvolPath: text("subvol_path").notNull(),
  retentionType: text("retention_type", {
    enum: ["daily", "weekly", "monthly"]
  }).notNull(),
  keepCount: integer("keep_count").notNull(),
  isEnabled: integer("is_enabled").notNull().default(0)
});
