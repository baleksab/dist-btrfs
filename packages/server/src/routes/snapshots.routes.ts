import z from "zod";
import { SnapshotsController } from "../controllers";
import { btrfsSnapshotResponse, btrfsSnapshotsResponse } from "../dtos";
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
