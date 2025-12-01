import { BtrfsController } from "../controllers";
import { btrfsSubvolumesResponse } from "../dtos";
import { createRoute } from "../utils";

const controller = new BtrfsController();

createRoute({
  method: "get",
  path: "/btrfs/subvolumes",
  handler: controller.getAllSubvolumes.bind(controller),
  response: btrfsSubvolumesResponse,
  tags: ["Btrfs"]
});
