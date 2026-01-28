import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";

extendZodWithOpenApi(z);

export const btrfsSnapshotResponse = z
  .object({
    name: z.string().describe("Snapshot name or identifier"),
    path: z.string().describe("Filesystem path of the snapshot"),
    createdAt: z
      .string()
      .optional()
      .describe("Timestamp when the snapshot was created, if available"),
    sizeBytes: z.number().optional().describe("Size of the snapshot in bytes, if available")
  })
  .openapi("BtrfsSnapshotResponse", {
    description: "Metadata describing a single Btrfs snapshot."
  });

export type BtrfsSnapshotResponse = z.infer<typeof btrfsSnapshotResponse>;

export const btrfsSnapshotsResponse = z
  .array(btrfsSnapshotResponse)
  .openapi("BtrfsSnapshotsResponse", {
    description: "Array of snapshot metadata objects for a subvolume."
  });

export type BtrfsSnapshotsResponse = z.infer<typeof btrfsSnapshotsResponse>;

export const btrfsSnapshotDeleteResponse = z
  .object({
    path: z.string().describe("Path of the snapshot that was requested for deletion"),
    deleted: z.boolean().describe("Whether the snapshot was deleted successfully"),
    message: z.string().describe("Optional message describing the result of the delete operation")
  })
  .openapi("BtrfsSnapshotDeleteResponse", {
    description: "Result of a snapshot deletion request."
  });

export type BtrfsSnapshotDeleteResponse = z.infer<typeof btrfsSnapshotDeleteResponse>;

export const btrfsSnapshotRestoreResponse = z
  .object({
    restored: z.string().describe("Identifier or path of the restored entity"),
    snapshotUsed: z.string().describe("Snapshot identifier that was used for the restore"),
    newSubvolume: z.string().describe("Path of the newly created/restored subvolume, if applicable")
  })
  .openapi("BtrfsSnapshotRestoreResponse", {
    description: "Response returned after attempting to restore a snapshot."
  });

export type BtrfsSnapshotRestoreResponse = z.infer<typeof btrfsSnapshotRestoreResponse>;

export const btrfsSnapshotCleanupRequest = z
  .object({
    type: z.enum(["daily", "weekly", "monthly"]).describe("Cleanup cadence to apply"),
    keep: z.number().min(1).describe("Number of snapshots to retain for the given cadence")
  })
  .openapi("BtrfsSnapshotCleanupRequest", {
    description: "Request payload describing snapshot cleanup rules to apply to a subvolume."
  });

export type BtrfsSnapshotCleanupRequest = z.infer<typeof btrfsSnapshotCleanupRequest>;

export const btrfsSnapshotCleanupResponse = z
  .object({
    cleaned: z.boolean().describe("Whether any snapshots were cleaned/deleted"),
    kept: z.array(z.string()).describe("Array of snapshot identifiers that were kept"),
    deletedSnapshots: z
      .array(z.string())
      .describe("Array of snapshot identifiers that were deleted"),
    totalBefore: z.number().describe("Total number of snapshots before cleanup"),
    totalAfter: z.number().describe("Total number of snapshots after cleanup")
  })
  .openapi("BtrfsSnapshotCleanupResponse", {
    description: "Result of running snapshot cleanup according to provided rules."
  });

export type BtrfsSnapshotCleanupResponse = z.infer<typeof btrfsSnapshotCleanupResponse>;

export const btrfsSnapshotFullReplicationRequest = z
  .object({
    secondaryServers: z
      .array(z.string())
      .describe("Array of server UIDs to which the snapshot should be fully replicated")
  })
  .openapi("BtrfsSnapshotFullReplicationRequest", {
    description:
      "Request to start a full replication of a snapshot to one or more secondary servers."
  });

export type BtrfsSnapshotFullReplicationRequest = z.infer<
  typeof btrfsSnapshotFullReplicationRequest
>;

export const replicationResult = z.object({
  serverUid: z.string().describe("UID of the target server for replication"),
  address: z.string().describe("Address of the target server"),
  port: z.number().default(22).describe("Port used for replication/connection"),
  status: z.enum(["ok", "failed"]).describe("Replication result status for this server"),
  error: z.string().optional().describe("Optional error message when status is failed")
});

export const btrfsSnapshotFullReplicationResponse = z
  .object({
    snapshotPath: z.string().describe("Path of the snapshot that was replicated"),
    results: z.array(replicationResult).describe("Array of replication results per target server")
  })
  .openapi("BtrfsSnapshotFullReplicationResponse", {
    description: "Results from a full replication operation for a snapshot."
  });

export type ReplicationResult = z.infer<typeof replicationResult>;

export type BtrfsSnapshotFullReplicationResponse = z.infer<
  typeof btrfsSnapshotFullReplicationResponse
>;

export const btrfsSnapshotIncrementalReplicationRequest = z
  .object({
    secondaryServer: z.string().describe("UID of the secondary server to replicate to"),
    secondaryServersSnapshot: z
      .string()
      .describe(
        "Identifier or path of the snapshot on the secondary server to use as base for incremental replication"
      )
  })
  .openapi("BtrfsSnapshotIncrementalReplicationRequest", {
    description:
      "Request to perform an incremental replication using a base snapshot on the secondary server."
  });

export type BtrfsSnapshotIncrementalReplicationRequest = z.infer<
  typeof btrfsSnapshotIncrementalReplicationRequest
>;

export const btrfsSnapshotSize = z.object({
  total: z.string().optional().describe("Total size representation (human or bytes)"),
  exclusive: z.string().optional().describe("Exclusive size representation"),
  shared: z.string().optional().describe("Shared size representation")
});

export const btrfsSnapshotMeta = z.object({
  name: z.string().optional().describe("Snapshot name, if present"),
  uuid: z.string().optional().describe("Snapshot UUID"),
  receivedUuid: z.string().optional().describe("Received UUID for transferred snapshots"),
  parentUuid: z.string().optional().describe("Parent snapshot UUID, if any"),
  creationTime: z.string().optional().describe("Raw creation timestamp"),
  generation: z.string().optional().describe("Filesystem generation string"),
  subvolumeId: z.string().optional().describe("Subvolume identifier"),
  flags: z.string().optional().describe("Filesystem flags associated with snapshot"),
  size: btrfsSnapshotSize.optional().describe("Size breakdown for the snapshot"),
  ageSeconds: z.number().optional().describe("Age of the snapshot in seconds"),
  lagSeconds: z.number().optional().describe("Replication lag in seconds, if applicable")
});

export type BtrfsSnapshotMeta = z.infer<typeof btrfsSnapshotMeta>;

export const btrfsSnapshotReplicationHealthReplica = z.object({
  serverUid: z.string().describe("UID of the replica server"),
  address: z.string().describe("Address of the replica server"),
  port: z.number().default(22).describe("Port used to reach the replica server"),
  status: z.enum(["ok", "missing", "error"]).describe("Replica health status"),
  foundPath: z
    .string()
    .optional()
    .describe("Path where the snapshot was found on the replica, if any"),
  meta: btrfsSnapshotMeta.optional().describe("Optional metadata about the replica snapshot")
});

export const btrfsSnapshotReplicationHealthResponse = z
  .object({
    snapshotPath: z.string().describe("Path of the snapshot being checked"),
    primary: z
      .object({
        status: z.enum(["ok", "missing", "error"]).describe("Primary snapshot status"),
        meta: btrfsSnapshotMeta.optional().describe("Optional metadata for the primary snapshot")
      })
      .describe("Primary snapshot health information"),
    replicas: z
      .array(btrfsSnapshotReplicationHealthReplica)
      .describe("Array of replica health entries"),
    overall: z.enum(["ok", "degraded", "failed"]).describe("Overall replication health summary")
  })
  .openapi("BtrfsSnapshotReplicationHealthResponse", {
    description:
      "Health and replication status information for a snapshot across primary and replica servers."
  });

export type BtrfsSnapshotReplicationHealthResponse = z.infer<
  typeof btrfsSnapshotReplicationHealthResponse
>;
