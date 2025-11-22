import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { containers } from "./schema";

export type NewContainer = InferInsertModel<typeof containers>;
export type Container = InferSelectModel<typeof containers>;