import z from "zod";
import { BtrfsController } from "../controllers";
import { btrfsSubvolumeConfigResponse, btrfsSubvolumesResponse } from "../dtos";
import { createRoute } from "../utils";

const controller = new BtrfsController();

createRoute({
  method: "get",
  path: "/btrfs/subvolumes",
  handler: controller.getAllSubvolumes.bind(controller),
  response: btrfsSubvolumesResponse,
  tags: ["Btrfs"]
});

createRoute({
  method: "get",
  path: "/btrfs/subvolumes/:subvolume",
  handler: controller.getSubvolumeConfig.bind(controller),
  response: btrfsSubvolumeConfigResponse,
  params: z.object({
    subvolume: z.string()
  }),
  tags: ["Btrfs"]
});
