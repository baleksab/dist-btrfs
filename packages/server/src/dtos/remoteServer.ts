import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const createNewServerRequest = z.object({
  ipAddress: z.string().min(3),
  username: z.string().min(1),
  password: z.string().min(1),
}).openapi("CreateNewServerRequest");

export type CreateNewServerRequest = z.infer<typeof createNewServerRequest>;

export const createNewServerResponse = z.object({
  ipAddress: z.string(),
  uid: z.string()
}).openapi("CreateNewServerResponse");

export type CreateNewServerResponse = z.infer<typeof createNewServerResponse>;

export const getAllServersResponse = z.object({
  ipAddress: z.string(),
  uid: z.string()
}).openapi("GetAllServersResponse");

export type GetAllServersResponse = z.infer<typeof getAllServersResponse>;