import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { btrfsSnapshotCleanupRequest } from "./snapshots";

extendZodWithOpenApi(z);

export const btrfsSubvolumesResponse = z
  .array(
    z.object({
      id: z.number(),
      gen: z.string(),
      topLevel: z.string(),
      path: z.string()
    })
  )
  .openapi("BtrfsSubvolumesResponse");

export type BtrfsSubvolumesResponse = z.infer<typeof btrfsSubvolumesResponse>;

export const btrfsSubvolumeConfigResponse = z
  .object({
    id: z.string(),
    serverUid: z.string(),
    subvolPath: z.string(),
    snapshotIntervalSeconds: z.number().positive(),
    isEnabled: z.boolean().default(false),
    exists: z.boolean().default(false)
  })
  .openapi("BtrfsSubvolumeConfigResponse");

export type BtrfsSubvolumeConfigResponse = z.infer<typeof btrfsSubvolumeConfigResponse>;

export const btrfsSubvolumeSetConfigRequest = btrfsSubvolumeConfigResponse
  .omit({
    serverUid: true,
    subvolPath: true,
    id: true,
    exists: true
  })
  .openapi("BtrfsSubvolumeSetConfigRequest");

export type BtrfsSubvolumeSetConfigRequest = z.infer<typeof btrfsSubvolumeSetConfigRequest>;

export const btrfsSubvolumeConfigAllResponse = z
  .array(btrfsSubvolumeConfigResponse)
  .openapi("BtrfsSubvolumeConfigAllResponse");

export type BtrfsSubvolumeConfigAllResponse = z.infer<typeof btrfsSubvolumeConfigAllResponse>;

export const btrfsSubvolumeSetRetentionConfigRequest = btrfsSnapshotCleanupRequest
  .extend({
    isEnabled: z.boolean().default(false)
  })
  .openapi("BtrfsSubvolumeSetRetentionConfigRequest");

export type BtrfsSubvolumeSetRetentionConfigRequest = z.infer<
  typeof btrfsSubvolumeSetRetentionConfigRequest
>;

export const btrfsSubvolumeRetentionConfigResponse = btrfsSnapshotCleanupRequest
  .extend({
    id: z.string(),
    serverUid: z.string(),
    subvolPath: z.string()
  })
  .openapi("BtrfsSubvolumeRetentionConfigResponse");

export type BtrfsSubvolumeRetentionConfigResponse = z.infer<
  typeof btrfsSubvolumeRetentionConfigResponse
>;

export const btrfsSubvolumeRetentionConfigAllResponse = z
  .array(btrfsSubvolumeSetRetentionConfigRequest)
  .openapi("BtrfsSubvolumeRetentionConfigAllResponse");

export type BtrfsSubvolumeRetentionConfigAllResponse = z.infer<
  typeof btrfsSubvolumeRetentionConfigAllResponse
>;
