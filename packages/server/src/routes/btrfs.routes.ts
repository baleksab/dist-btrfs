import z from "zod";
import { BtrfsController } from "../controllers";
import {
  btrfsStorageMetricsResponse,
  btrfsSubvolumeConfigAllResponse,
  btrfsSubvolumeConfigResponse,
  btrfsSubvolumeDetailedMetricsResponse,
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
  query: z.object({
    serverUid: z.string().optional()
  }),
  handler: controller.getAllSubvolumes.bind(controller),
  response: btrfsSubvolumesResponse,
  description:
    "List all Btrfs subvolumes. Optionally filter by `serverUid` to return subvolumes from a specific server.",
  tags: ["Btrfs"]
});

createRoute({
  method: "get",
  path: "/btrfs/subvolumes/config",
  handler: controller.getSubvolumeConfigAll.bind(controller),
  response: btrfsSubvolumeConfigAllResponse,
  description: "Retrieve configuration for all known subvolumes.",
  tags: ["Btrfs"]
});

createRoute({
  method: "get",
  path: "/btrfs/subvolumes/retention/config",
  handler: controller.getSubvolumeRetentionConfigAll.bind(controller),
  response: btrfsSubvolumeRetentionConfigAllResponse,
  description: "Retrieve retention configuration for all subvolumes.",
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
  description:
    "Get configuration for a specific subvolume identified by the `subvolume` path parameter.",
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
  description:
    "Set or update configuration for the specified subvolume. Request body must match the subvolume config schema.",
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
  description: "Get retention configuration for the specified subvolume.",
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
  description:
    "Create or update retention configuration for the specified subvolume. Request body must match the retention config schema.",
  tags: ["Btrfs"]
});

createRoute({
  method: "get",
  path: "/btrfs/subvolumes/:subvolume/health",
  handler: controller.checkIfSubvolumeExists.bind(controller),
  response: z.boolean(),
  params: z.object({
    subvolume: z.string()
  }),
  query: z.object({
    serverUid: z.string().optional()
  }),
  description:
    "Check whether the specified subvolume exists on the target server. Returns `true` if present, `false` otherwise. Optionally specify `serverUid`.",
  tags: ["Btrfs"]
});

createRoute({
  method: "get",
  path: "/btrfs/storageMetrics",
  handler: controller.getStorageMetrics.bind(controller),
  response: btrfsStorageMetricsResponse,
  query: z.object({
    serverUid: z.string().optional()
  }),
  description:
    "Retrieve aggregated storage metrics for Btrfs filesystems. Optionally filter metrics by `serverUid`.",
  tags: ["Btrfs"]
});

createRoute({
  method: "get",
  path: "/btrfs/subvolumes/:subvolume/storageMetrics",
  handler: controller.getSubvolumeStorageMetrics.bind(controller),
  query: z.object({
    serverUid: z.string().optional()
  }),
  params: z.object({
    subvolume: z.string()
  }),
  response: btrfsSubvolumeDetailedMetricsResponse,
  description:
    "Retrieve detailed storage metrics for the specified subvolume. Optionally provide `serverUid` to query a remote server.",
  tags: ["Btrfs"]
});
