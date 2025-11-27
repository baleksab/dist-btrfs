import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const createNewServerDto = z.object({
  ipAddress: z.string().min(3),
  username: z.string().min(1),
  password: z.string().min(1),
}).openapi("CreateNewServerRequest");

export type CreateNewServerDto = z.infer<typeof createNewServerDto>;