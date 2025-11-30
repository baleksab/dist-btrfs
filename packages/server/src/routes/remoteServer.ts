import { RemoteServerController } from "../controllers";
import { createNewServerRequest, createNewServerResponse, getAllServersResponse } from "../dtos";
import { createRoute } from "../utils";

const controller = new RemoteServerController();

createRoute({
  method: "post",
  path: "/servers",
  dto: createNewServerRequest,
  handler: controller.create.bind(controller),
  response: createNewServerResponse,
  summary: "Create new remote server",
  tags: ["RemoteServers"]
});

createRoute({
  method: "get",
  path: "/servers",
  handler: controller.getAll.bind(controller),
  response: getAllServersResponse,
  tags: ["RemoteServers"]
});
