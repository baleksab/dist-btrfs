import z from "zod";
import { BtrfsController } from "../controllers";
import {
  btrfsSubvolumeConfigAllResponse,
  btrfsSubvolumeConfigResponse,
  btrfsSubvolumeRetentionConfigAllResponse,
  btrfsSubvolumeRetentionConfigResponse,
  btrfsSubvolumeSetConfigRequest,
  btrfsSubvolumeSetRetentionConfigRequest,
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
  path: "/btrfs/subvolumes/retention/config",
  handler: controller.getSubvolumeRetentionConfigAll.bind(controller),
  response: btrfsSubvolumeRetentionConfigAllResponse,
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

createRoute({
  method: "get",
  path: "/btrfs/subvolumes/:subvolume/retention/config",
  handler: controller.getSubvolumeRetentionConfig.bind(controller),
  response: btrfsSubvolumeRetentionConfigResponse,
  params: z.object({
    subvolume: z.string()
  }),
  tags: ["Btrfs"]
});

createRoute({
  method: "post",
  path: "/btrfs/subvolumes/:subvolume/retention/config",
  handler: controller.setSubvolumeRetentionConfig.bind(controller),
  dto: btrfsSubvolumeSetRetentionConfigRequest,
  response: btrfsSubvolumeRetentionConfigResponse,
  params: z.object({
    subvolume: z.string()
  }),
  tags: ["Btrfs"]
});
