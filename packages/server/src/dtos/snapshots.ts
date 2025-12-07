import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";

extendZodWithOpenApi(z);

export const btrfsSnapshotResponse = z
  .object({
    name: z.string(),
    path: z.string(),
    createdAt: z.string().optional(),
    sizeBytes: z.number().optional()
  })
  .openapi("BtrfsSnapshotResponse");

export type BtrfsSnapshotResponse = z.infer<typeof btrfsSnapshotResponse>;

export const btrfsSnapshotsResponse = z
  .array(btrfsSnapshotResponse)
  .openapi("BtrfsSnapshotsResponse");

export type BtrfsSnapshotsResponse = z.infer<typeof btrfsSnapshotsResponse>;

export const btrfsSnapshotDeleteResponse = z
  .object({
    path: z.string(),
    deleted: z.boolean(),
    message: z.string()
  })
  .openapi("BtrfsSnapshotDeleteResponse");

export type BtrfsSnapshotDeleteResponse = z.infer<typeof btrfsSnapshotDeleteResponse>;

export const btrfsSnapshotRestoreResponse = z
  .object({
    restored: z.string(),
    snapshotUsed: z.string(),
    newSubvolume: z.string()
  })
  .openapi("BtrfsSnapshotRestoreResponse");

export type BtrfsSnapshotRestoreResponse = z.infer<typeof btrfsSnapshotRestoreResponse>;

export const btrfsSnapshotCleanupRequest = z
  .object({
    type: z.enum(["daily", "weekly", "monthly"]),
    keep: z.number().min(1)
  })
  .openapi("BtrfsSnapshotCleanupRequest");

export type BtrfsSnapshotCleanupRequest = z.infer<typeof btrfsSnapshotCleanupRequest>;

export const btrfsSnapshotCleanupResponse = z
  .object({
    cleaned: z.boolean(),
    kept: z.array(z.string()),
    deletedSnapshots: z.array(z.string()),
    totalBefore: z.number(),
    totalAfter: z.number()
  })
  .openapi("BtrfsSnapshotCleanupResponse");

export type BtrfsSnapshotCleanupResponse = z.infer<typeof btrfsSnapshotCleanupResponse>;
