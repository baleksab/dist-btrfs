import z from "zod";
import { SnapshotsController } from "../controllers";
import {
  btrfsSnapshotCleanupRequest,
  btrfsSnapshotCleanupResponse,
  btrfsSnapshotDeleteResponse,
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
  response: btrfsSnapshotsResponse,
  tags: ["Snapshots"]
});

createRoute({
  method: "post",
  path: "/snapshots/:subvolume",
  handler: controller.createSnapshot.bind(controller),
  params: z.object({ subvolume: z.string() }),
  response: btrfsSnapshotResponse,
  tags: ["Snapshots"]
});

createRoute({
  method: "delete",
  path: "/snapshots/:subvolume",
  handler: controller.cleanupSnapshots.bind(controller),
  params: z.object({ subvolume: z.string() }),
  response: btrfsSnapshotCleanupResponse,
  dto: btrfsSnapshotCleanupRequest,
  tags: ["Snapshots"]
});

createRoute({
  method: "delete",
  path: "/snapshots/:subvolume/:snapshot",
  handler: controller.deleteSnapshot.bind(controller),
  params: z.object({ subvolume: z.string(), snapshot: z.string() }),
  response: btrfsSnapshotDeleteResponse,
  tags: ["Snapshots"]
});

createRoute({
  method: "post",
  path: "/snapshots/:subvolume/:snapshot/restore",
  handler: controller.restoreSnapshot.bind(controller),
  params: z.object({ subvolume: z.string(), snapshot: z.string() }),
  response: btrfsSnapshotRestoreResponse,
  tags: ["Snapshots"]
});
