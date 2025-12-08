import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { remoteServers, subvolumeConfigs } from "./schema";

export type NewRemoteServer = InferInsertModel<typeof remoteServers>;
export type UpdateRemoteServer = Partial<NewRemoteServer>;
export type RemoteServer = InferSelectModel<typeof remoteServers>;

export type NewSubvolumeConfig = InferSelectModel<typeof subvolumeConfigs>;
export type UpdateSubvolumeConfig = Partial<NewSubvolumeConfig>;
export type SubvolumeConfig = InferSelectModel<typeof subvolumeConfigs>;
