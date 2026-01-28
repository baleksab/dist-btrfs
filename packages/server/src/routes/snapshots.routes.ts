import z from "zod";
import { SnapshotsController } from "../controllers";
import {
  btrfsSnapshotCleanupRequest,
  btrfsSnapshotCleanupResponse,
  btrfsSnapshotDeleteResponse,
  btrfsSnapshotFullReplicationRequest,
  btrfsSnapshotFullReplicationResponse,
  btrfsSnapshotIncrementalReplicationRequest,
  btrfsSnapshotReplicationHealthResponse,
  btrfsSnapshotResponse,
  btrfsSnapshotRestoreResponse,
  btrfsSnapshotsResponse
} from "../dtos";
import { createRoute } from "../utils";

const controller = new SnapshotsController();

createRoute({
  method: "get",
  path: "/snapshots/:subvolume",
  handler: controller.listSnapshot.bind(controller),
  params: z.object({ subvolume: z.string() }),
  query: z.object({ serverUid: z.string().optional() }),
  response: btrfsSnapshotsResponse,
  description:
    "List snapshots for the specified subvolume. Optionally include `serverUid` to list snapshots from a specific remote server.",
  tags: ["Snapshots"]
});

createRoute({
  method: "post",
  path: "/snapshots/:subvolume",
  handler: controller.createSnapshot.bind(controller),
  params: z.object({ subvolume: z.string() }),
  response: btrfsSnapshotResponse,
  description: "Create a new snapshot for the specified subvolume and return its metadata.",
  tags: ["Snapshots"]
});

createRoute({
  method: "delete",
  path: "/snapshots/:subvolume",
  handler: controller.cleanupSnapshots.bind(controller),
  params: z.object({ subvolume: z.string() }),
  response: btrfsSnapshotCleanupResponse,
  dto: btrfsSnapshotCleanupRequest,
  description:
    "Clean up snapshots for the specified subvolume according to the provided cleanup rules; returns the cleanup result.",
  tags: ["Snapshots"]
});

createRoute({
  method: "delete",
  path: "/snapshots/:subvolume/:snapshot",
  handler: controller.deleteSnapshot.bind(controller),
  params: z.object({ subvolume: z.string(), snapshot: z.string() }),
  response: btrfsSnapshotDeleteResponse,
  description:
    "Delete a single snapshot identified by the `snapshot` path parameter from the given subvolume.",
  tags: ["Snapshots"]
});

createRoute({
  method: "post",
  path: "/snapshots/:subvolume/:snapshot/restore",
  handler: controller.restoreSnapshot.bind(controller),
  params: z.object({ subvolume: z.string(), snapshot: z.string() }),
  response: btrfsSnapshotRestoreResponse,
  description:
    "Restore the specified snapshot into its subvolume. Returns the result of the restore operation.",
  tags: ["Snapshots"]
});

createRoute({
  method: "post",
  path: "/snapshots/:subvolume/:snapshot/replication/full",
  handler: controller.fullReplication.bind(controller),
  params: z.object({ subvolume: z.string(), snapshot: z.string() }),
  dto: btrfsSnapshotFullReplicationRequest,
  response: btrfsSnapshotFullReplicationResponse,
  description:
    "Start a full replication of the specified snapshot to a configured remote target. Request body specifies replication options.",
  tags: ["Snapshots"]
});

createRoute({
  method: "post",
  path: "/snapshots/:subvolume/:snapshot/replication/incremental",
  handler: controller.incrementalReplication.bind(controller),
  params: z.object({ subvolume: z.string(), snapshot: z.string() }),
  dto: btrfsSnapshotIncrementalReplicationRequest,
  response: btrfsSnapshotFullReplicationResponse,
  description:
    "Start an incremental replication for the specified snapshot. Request body contains incremental replication parameters.",
  tags: ["Snapshots"]
});

createRoute({
  method: "get",
  path: "/snapshots/:subvolume/:snapshot/health",
  handler: controller.snapshotHealth.bind(controller),
  params: z.object({ subvolume: z.string(), snapshot: z.string() }),
  response: btrfsSnapshotReplicationHealthResponse,
  description: "Return replication health and status information for the specified snapshot.",
  tags: ["Snapshots"]
});
