import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const createNewServerRequest = z
  .object({
    name: z.string(),
    ipAddress: z.string().min(3),
    port: z.number().int().min(1).max(65535).default(22),
    username: z.string().min(1),
    password: z.string().min(1),
    isPrimary: z.boolean().default(false)
  })
  .openapi("CreateNewServerRequest");

export type CreateNewServerRequest = z.infer<typeof createNewServerRequest>;

export const createNewServerResponse = z
  .object({
    uid: z.string(),
    ipAddress: z.string(),
    port: z.number().int().min(1).max(65535).default(22),
    isPrimary: z.boolean().default(false)
  })
  .openapi("CreateNewServerResponse");

export type CreateNewServerResponse = z.infer<typeof createNewServerResponse>;

export const getAllServersResponse = z.array(
  z
    .object({
      uid: z.string(),
      name: z.string(),
      ipAddress: z.string().min(3),
      port: z.number().int().min(1).max(65535).default(22),
      isPrimary: z.boolean().default(false)
    })
    .openapi("GetAllServersResponse")
);

export type GetAllServersResponse = z.infer<typeof getAllServersResponse>;

export const updateServerRequest = createNewServerRequest.partial().openapi("UpdateServerRequest");

export type UpdateServerRequest = z.infer<typeof updateServerRequest>;

export const healthCheckResponse = z
  .object({
    uid: z.string(),
    online: z.boolean().default(false)
  })
  .openapi("HealthCheckResponse");

export type HealthCheckResponse = z.infer<typeof healthCheckResponse>;

export const healthCheckAllResponse = z
  .array(healthCheckResponse)
  .openapi("HealthCheckAllResponse");

export type HealthCheckAllResponse = z.infer<typeof healthCheckAllResponse>;

export const healthCheckRequest = z
  .object({
    ipAddress: z.string().min(3),
    port: z.number().int().min(1).max(65535).default(22),
    username: z.string().min(1),
    password: z.string().min(1)
  })
  .openapi("HealthCheckRequest");

export type HealthCheckRequest = z.infer<typeof healthCheckRequest>;
