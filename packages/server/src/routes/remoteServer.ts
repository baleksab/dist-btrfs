import { RemoteServerController } from "../controllers";
import {
  createNewServerRequest,
  createNewServerResponse,
  deleteServerRequest,
  getAllServersResponse
} from "../dtos";
import { createRoute } from "../utils";

const controller = new RemoteServerController();

createRoute({
  method: "post",
  path: "/servers",
  dto: createNewServerRequest,
  handler: controller.create.bind(controller),
  response: createNewServerResponse,
  tags: ["RemoteServers"]
});

createRoute({
  method: "get",
  path: "/servers",
  handler: controller.getAll.bind(controller),
  response: getAllServersResponse,
  tags: ["RemoteServers"]
});

createRoute({
  method: "delete",
  path: "/servers",
  dto: deleteServerRequest,
  handler: controller.delete.bind(controller),
  tags: ["RemoteServers"]
});
