import { createNewServer, getAllServers } from "../controllers";
import { createNewServerRequest, createNewServerResponse, getAllServersResponse } from "../dtos";
import { createRoute } from "../utils";

createRoute({
  method: "post",
  path: "/servers",
  dto: createNewServerRequest,
  handler: createNewServer,
  response: createNewServerResponse,
  summary: "Create new remote server",
  tags: ["RemoteServers"]
});

createRoute({
  method: "get",
  path: "/servers",
  handler: getAllServers,
  response: getAllServersResponse,
  tags: ["RemoteServers"]
});
