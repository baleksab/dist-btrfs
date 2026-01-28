import z from "zod";
import { RemoteServerController } from "../controllers";
import {
  createNewServerRequest,
  createNewServerResponse,
  getAllServersResponse,
  updateServerRequest,
  healthCheckAllResponse,
  healthCheckResponse,
  healthCheckRequest
} from "../dtos";
import { createRoute } from "../utils";

const controller = new RemoteServerController();

createRoute({
  method: "post",
  path: "/servers",
  dto: createNewServerRequest,
  handler: controller.create.bind(controller),
  response: createNewServerResponse,
  description:
    "Add a new remote server configuration. Request body must conform to the server creation schema; returns the created server object on success.",
  tags: ["RemoteServers"]
});

createRoute({
  method: "get",
  path: "/servers",
  handler: controller.getAll.bind(controller),
  response: getAllServersResponse,
  description: "Return a list of configured remote servers and their connection metadata.",
  tags: ["RemoteServers"]
});

createRoute({
  method: "delete",
  path: "/servers/:uid",
  handler: controller.delete.bind(controller),
  description:
    "Remove the remote server identified by `uid` from the system and delete its stored configuration.",
  tags: ["RemoteServers"],
  params: z.object({ uid: z.string() })
});

createRoute({
  method: "put",
  path: "/servers/:uid",
  params: z.object({ uid: z.string() }),
  dto: updateServerRequest,
  handler: controller.update.bind(controller),
  description:
    "Update the configuration of an existing remote server identified by `uid`. Request body must match the update schema.",
  tags: ["RemoteServers"]
});

createRoute({
  method: "get",
  path: "/servers/healthCheck",
  response: healthCheckAllResponse,
  handler: controller.healthCheckAll.bind(controller),
  description:
    "Run health checks for all configured remote servers and return their current connectivity/status results.",
  tags: ["RemoteServers"]
});

createRoute({
  method: "post",
  path: "/servers/validate",
  dto: healthCheckRequest,
  response: healthCheckResponse,
  handler: controller.healthCheck.bind(controller),
  description:
    "Validate provided server connection details without persisting them; returns a health check result describing whether the connection succeeded.",
  tags: ["RemoteServers"]
});
