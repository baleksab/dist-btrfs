import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const remoteServers = sqliteTable("remote_servers", {
  uid: text("uid").primaryKey(),           
  ipAddress: text("ip_address").notNull(), 
  username: text("username").notNull(), 
  password: text("password").notNull(),
});