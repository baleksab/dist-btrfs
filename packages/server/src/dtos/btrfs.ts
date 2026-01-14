import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

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

export const btrfsSubvolumeRetentionConfigResponse = z
  .object({
    id: z.string(),
    serverUid: z.string(),
    subvolPath: z.string(),
    type: z.enum(["daily", "weekly", "monthly"]),
    keep: z.number().min(1),
    retentionIntervalSeconds: z.number().positive(),
    exists: z.boolean().default(false),
    isEnabled: z.boolean().default(false)
  })
  .openapi("BtrfsSubvolumeRetentionConfigResponse");

export type BtrfsSubvolumeRetentionConfigResponse = z.infer<
  typeof btrfsSubvolumeRetentionConfigResponse
>;

export const btrfsSubvolumeSetRetentionConfigRequest = btrfsSubvolumeRetentionConfigResponse
  .omit({
    exists: true,
    serverUid: true,
    subvolPath: true,
    id: true
  })
  .openapi("BtrfsSubvolumeSetRetentionConfigRequest");

export type BtrfsSubvolumeSetRetentionConfigRequest = z.infer<
  typeof btrfsSubvolumeSetRetentionConfigRequest
>;

export const btrfsSubvolumeRetentionConfigAllResponse = z
  .array(btrfsSubvolumeRetentionConfigResponse)
  .openapi("BtrfsSubvolumeRetentionConfigAllResponse");

export type BtrfsSubvolumeRetentionConfigAllResponse = z.infer<
  typeof btrfsSubvolumeRetentionConfigAllResponse
>;

export const btrfsStorageMetricsResponse = z
  .object({
    totalBytes: z.number(),
    usedBytes: z.number(),
    freeBytes: z.number(),
    data: z.object({
      total: z.number(),
      used: z.number()
    }),
    metadata: z.object({
      total: z.number(),
      used: z.number()
    }),
    system: z.object({
      total: z.number(),
      used: z.number()
    }),
    chart: z.array(
      z.object({
        name: z.string(),
        value: z.number(),
        color: z.string()
      })
    )
  })
  .openapi("BtrfsStorageMetricsResponse");

export type BtrfsStorageMetricsResponse = z.infer<typeof btrfsStorageMetricsResponse>;

export const btrfsFileSystemMetrics = z.object({
  totalBytes: z.number().nonnegative(),
  usedBytes: z.number().nonnegative(),
  freeBytes: z.number().nonnegative()
});

export type BtrfsFileSystemMetrics = z.infer<typeof btrfsFileSystemMetrics>;

export const btrfsSnapshotMetrics = z.object({
  path: z.string(),
  name: z.string(),
  timestamp: z.string().datetime().nullable(),
  referencedBytes: z.number().nonnegative(),
  exclusiveBytes: z.number().nonnegative(),
  efficiency: z.number().min(0)
});

export type BtrfsSnapshotMetrics = z.infer<typeof btrfsSnapshotMetrics>;

export const btrfsSubvolumeMetrics = z.object({
  path: z.string(),
  name: z.string(),
  referencedBytes: z.number().nonnegative(),
  exclusiveBytes: z.number().nonnegative(),
  snapshotCount: z.number().int().nonnegative(),
  totalSnapshotExclusiveBytes: z.number().nonnegative()
});

export type BtrfsSubvolumeMetrics = z.infer<typeof btrfsSubvolumeMetrics>;

export const btrfsSubvolumeDetailedMetricsResponse = z
  .object({
    filesystem: btrfsFileSystemMetrics,
    subvolume: btrfsSubvolumeMetrics.nullable(),
    snapshots: z.array(btrfsSnapshotMetrics)
  })
  .openapi("BtrfsSubvolumeDetailedMetricsResponse");

export type BtrfsSubvolumeDetailedMetricsResponse = z.infer<
  typeof btrfsSubvolumeDetailedMetricsResponse
>;
