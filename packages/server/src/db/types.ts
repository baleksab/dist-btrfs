import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { remoteServers } from "./schema";

export type NewRemoteServer = InferInsertModel<typeof remoteServers>;
export type UpdateRemoteServer = Partial<NewRemoteServer>;
export type RemoteServer = InferSelectModel<typeof remoteServers>;
