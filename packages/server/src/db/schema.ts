import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const containers = sqliteTable("containers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),          
  image: text("image").notNull(),              
  isEnabled: integer("is_enabled").notNull().default(1),    
  isPrimary: integer("is_primary").notNull().default(0),
  btrfsVolumePath: text("btrfs_volume_path"),  
  deletedAt: integer("deleted_at"), 
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(strftime('%s','now'))`), 
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(strftime('%s','now'))`),
});