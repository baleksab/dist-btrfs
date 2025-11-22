import { containers } from "./schema";

export type NewContainer = typeof containers.$inferInsert;
export type Container = typeof containers.$inferSelect;