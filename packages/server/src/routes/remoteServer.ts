import z from "zod";
import { RemoteServerController } from "../controllers";
import {
  createNewServerRequest,
  createNewServerResponse,
  getAllServersResponse,
  updateServerRequest
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
  path: "/servers/:uid",
  handler: controller.delete.bind(controller),
  tags: ["RemoteServers"],
  params: z.object({ uid: z.string() })
});

createRoute({
  method: "put",
  path: "/servers/:uid",
  params: z.object({ uid: z.string() }),
  dto: updateServerRequest,
  handler: controller.update.bind(controller),
  tags: ["RemoteServers"]
});
