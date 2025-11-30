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
