import z from "zod";
import { BtrfsController } from "../controllers";
import {
  btrfsSubvolumeConfigAllResponse,
  btrfsSubvolumeConfigResponse,
  btrfsSubvolumeSetConfigRequest,
  btrfsSubvolumesResponse
} from "../dtos";
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
  path: "/btrfs/subvolumes/config",
  handler: controller.getSubvolumeConfigAll.bind(controller),
  response: btrfsSubvolumeConfigAllResponse,
  tags: ["Btrfs"]
});

createRoute({
  method: "get",
  path: "/btrfs/subvolumes/:subvolume/config",
  handler: controller.getSubvolumeConfig.bind(controller),
  response: btrfsSubvolumeConfigResponse,
  params: z.object({
    subvolume: z.string()
  }),
  tags: ["Btrfs"]
});

createRoute({
  method: "post",
  path: "/btrfs/subvolumes/:subvolume/config",
  handler: controller.setSubvolumeConfig.bind(controller),
  dto: btrfsSubvolumeSetConfigRequest,
  response: btrfsSubvolumeConfigResponse,
  params: z.object({
    subvolume: z.string()
  }),
  tags: ["Btrfs"]
});
