import { createNewServer } from "../controllers";
import { createNewServerDto } from "../dtos";
import { createRoute } from "../utils";

createRoute({
  method: "post",
  path: "/servers",
  dto: createNewServerDto,
  handler: createNewServer,
  summary: "Create new remote server",
  tags: ["RemoteServers"],
});