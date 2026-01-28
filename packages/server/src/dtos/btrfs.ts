import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const btrfsSubvolumesResponse = z
  .array(
    z
      .object({
        id: z.number().describe("Numeric identifier for the subvolume record"),
        gen: z.string().describe("Filesystem generation identifier for this subvolume"),
        topLevel: z.string().describe("Top-level identifier for the subvolume"),
        path: z.string().describe("Filesystem path where the subvolume is mounted or located")
      })
      .describe("Information about a single Btrfs subvolume")
  )
  .openapi("BtrfsSubvolumesResponse", {
    description: "Array of Btrfs subvolumes returned by listing endpoints"
  });

export type BtrfsSubvolumesResponse = z.infer<typeof btrfsSubvolumesResponse>;

export const btrfsSubvolumeConfigResponse = z
  .object({
    id: z.string().describe("Unique identifier for the stored subvolume configuration"),
    serverUid: z.string().describe("UID of the server where the subvolume resides"),
    subvolPath: z.string().describe("Path of the subvolume on the server"),
    snapshotIntervalSeconds: z
      .number()
      .positive()
      .describe("Configured snapshot interval in seconds"),
    isEnabled: z
      .boolean()
      .default(false)
      .describe("Whether automatic snapshotting/replication is enabled"),
    exists: z
      .boolean()
      .default(false)
      .describe("Indicates whether the subvolume currently exists on the target server")
  })
  .openapi("BtrfsSubvolumeConfigResponse", {
    description: "Persisted configuration for a single subvolume"
  });

export type BtrfsSubvolumeConfigResponse = z.infer<typeof btrfsSubvolumeConfigResponse>;

export const btrfsSubvolumeSetConfigRequest = btrfsSubvolumeConfigResponse
  .omit({
    serverUid: true,
    subvolPath: true,
    id: true,
    exists: true
  })
  .openapi("BtrfsSubvolumeSetConfigRequest", {
    description: "Request payload to create or update a subvolume's configurable fields"
  });

export type BtrfsSubvolumeSetConfigRequest = z.infer<typeof btrfsSubvolumeSetConfigRequest>;

export const btrfsSubvolumeConfigAllResponse = z
  .array(btrfsSubvolumeConfigResponse)
  .openapi("BtrfsSubvolumeConfigAllResponse", {
    description: "List of persisted subvolume configurations"
  });

export type BtrfsSubvolumeConfigAllResponse = z.infer<typeof btrfsSubvolumeConfigAllResponse>;

export const btrfsSubvolumeRetentionConfigResponse = z
  .object({
    id: z.string().describe("Identifier for the retention policy record"),
    serverUid: z.string().describe("UID of the server the policy applies to"),
    subvolPath: z.string().describe("Subvolume path the retention policy targets"),
    type: z.enum(["daily", "weekly", "monthly"]).describe("Retention policy cadence/type"),
    keep: z.number().min(1).describe("Number of snapshots to keep according to the policy"),
    retentionIntervalSeconds: z
      .number()
      .positive()
      .describe("Interval in seconds between retention applications"),
    exists: z
      .boolean()
      .default(false)
      .describe("Indicates if the target subvolume currently exists"),
    isEnabled: z.boolean().default(false).describe("Whether the retention policy is active")
  })
  .openapi("BtrfsSubvolumeRetentionConfigResponse", {
    description: "Persisted retention configuration for a subvolume"
  });

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
  .openapi("BtrfsSubvolumeSetRetentionConfigRequest", {
    description: "Request payload to create or update a subvolume's retention policy fields"
  });

export type BtrfsSubvolumeSetRetentionConfigRequest = z.infer<
  typeof btrfsSubvolumeSetRetentionConfigRequest
>;

export const btrfsSubvolumeRetentionConfigAllResponse = z
  .array(btrfsSubvolumeRetentionConfigResponse)
  .openapi("BtrfsSubvolumeRetentionConfigAllResponse", {
    description: "List of retention policies for all subvolumes"
  });

export type BtrfsSubvolumeRetentionConfigAllResponse = z.infer<
  typeof btrfsSubvolumeRetentionConfigAllResponse
>;

export const btrfsStorageMetricsResponse = z
  .object({
    totalBytes: z.number().describe("Total filesystem capacity in bytes"),
    usedBytes: z.number().describe("Total used bytes across the filesystem"),
    freeBytes: z.number().describe("Free bytes available in the filesystem"),
    data: z
      .object({
        total: z.number().describe("Data subvolume total bytes"),
        used: z.number().describe("Data subvolume used bytes")
      })
      .describe("Data space metrics"),
    metadata: z
      .object({
        total: z.number().describe("Metadata space total bytes"),
        used: z.number().describe("Metadata space used bytes")
      })
      .describe("Metadata space metrics"),
    system: z
      .object({
        total: z.number().describe("System space total bytes"),
        used: z.number().describe("System space used bytes")
      })
      .describe("System space metrics"),
    chart: z
      .array(
        z
          .object({
            name: z.string().describe("Label for chart item"),
            value: z.number().describe("Numeric value for chart item"),
            color: z.string().describe("Hex or named color for chart item")
          })
          .describe("Single chart data point")
      )
      .describe("Optional chart-friendly breakdown of metrics")
  })
  .openapi("BtrfsStorageMetricsResponse", {
    description: "Aggregated storage metrics for a Btrfs filesystem"
  });

export type BtrfsStorageMetricsResponse = z.infer<typeof btrfsStorageMetricsResponse>;

export const btrfsFileSystemMetrics = z.object({
  totalBytes: z.number().nonnegative().describe("Filesystem total bytes"),
  usedBytes: z.number().nonnegative().describe("Filesystem used bytes"),
  freeBytes: z.number().nonnegative().describe("Filesystem free bytes")
});

export type BtrfsFileSystemMetrics = z.infer<typeof btrfsFileSystemMetrics>;

export const btrfsSnapshotMetrics = z.object({
  path: z.string().describe("Filesystem path of the snapshot"),
  name: z.string().describe("Snapshot name"),
  timestamp: z
    .string()
    .datetime()
    .nullable()
    .describe("ISO timestamp when snapshot was taken, or null"),
  referencedBytes: z.number().nonnegative().describe("Bytes referenced by the snapshot"),
  exclusiveBytes: z.number().nonnegative().describe("Bytes exclusive to this snapshot"),
  efficiency: z.number().min(0).describe("Snapshot space-efficiency metric (ratio or score)")
});

export type BtrfsSnapshotMetrics = z.infer<typeof btrfsSnapshotMetrics>;

export const btrfsSubvolumeMetrics = z.object({
  path: z.string().describe("Filesystem path of the subvolume"),
  name: z.string().describe("Subvolume name"),
  referencedBytes: z.number().nonnegative().describe("Bytes referenced by the subvolume"),
  exclusiveBytes: z.number().nonnegative().describe("Bytes exclusive to the subvolume"),
  snapshotCount: z
    .number()
    .int()
    .nonnegative()
    .describe("Number of snapshots associated with the subvolume"),
  totalSnapshotExclusiveBytes: z
    .number()
    .nonnegative()
    .describe("Total exclusive bytes across all snapshots")
});

export type BtrfsSubvolumeMetrics = z.infer<typeof btrfsSubvolumeMetrics>;

export const btrfsSubvolumeDetailedMetricsResponse = z
  .object({
    filesystem: btrfsFileSystemMetrics.describe(
      "Filesystem-level metrics for the subvolume's filesystem"
    ),
    subvolume: btrfsSubvolumeMetrics
      .nullable()
      .describe("Metrics for the specific subvolume, or null if not found"),
    snapshots: z.array(btrfsSnapshotMetrics).describe("Array of snapshot metrics for the subvolume")
  })
  .openapi("BtrfsSubvolumeDetailedMetricsResponse", {
    description:
      "Detailed storage metrics for a single subvolume, including snapshots and filesystem totals"
  });

export type BtrfsSubvolumeDetailedMetricsResponse = z.infer<
  typeof btrfsSubvolumeDetailedMetricsResponse
>;
