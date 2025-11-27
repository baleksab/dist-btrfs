import { createNewServer } from "../controllers";
import { createNewServerRequest, createNewServerResponse } from "../dtos";
import { createRoute } from "../utils";

createRoute({
  method: "post",
  path: "/servers",
  dto: createNewServerRequest,
  handler: createNewServer,
  response: createNewServerResponse,
  summary: "Create new remote server",
  tags: ["RemoteServers"],
});