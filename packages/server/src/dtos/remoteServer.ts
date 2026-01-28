import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const createNewServerRequest = z
  .object({
    name: z.string().describe("Human-readable server name"),
    ipAddress: z.string().min(3).describe("IP address or hostname of the remote server"),
    port: z.number().int().min(1).max(65535).default(22).describe("SSH port on the remote server"),
    username: z.string().min(1).describe("Username used for SSH authentication"),
    password: z.string().min(1).describe("Password used for SSH authentication"),
    isPrimary: z
      .boolean()
      .default(false)
      .describe("Whether this server is the primary/preferred target")
  })
  .openapi("CreateNewServerRequest", {
    description: "Payload to create and register a new remote server configuration."
  });

export type CreateNewServerRequest = z.infer<typeof createNewServerRequest>;

export const createNewServerResponse = z
  .object({
    uid: z.string().describe("Unique identifier assigned to the created server"),
    ipAddress: z.string().describe("IP address or hostname of the created server"),
    port: z
      .number()
      .int()
      .min(1)
      .max(65535)
      .default(22)
      .describe("SSH port for the created server"),
    isPrimary: z.boolean().default(false).describe("Whether this server is primary")
  })
  .openapi("CreateNewServerResponse", {
    description: "Response returned after creating a new remote server."
  });

export type CreateNewServerResponse = z.infer<typeof createNewServerResponse>;

export const getAllServersResponse = z
  .array(
    z
      .object({
        uid: z.string().describe("Server unique identifier"),
        name: z.string().describe("Server display name"),
        ipAddress: z.string().min(3).describe("Server IP or hostname"),
        port: z.number().int().min(1).max(65535).default(22).describe("SSH port"),
        isPrimary: z.boolean().default(false).describe("Whether this server is primary")
      })
      .describe("Remote server information object")
  )
  .openapi("GetAllServersResponse", {
    description: "List of configured remote servers and their connection metadata."
  });

export type GetAllServersResponse = z.infer<typeof getAllServersResponse>;

export const updateServerRequest = createNewServerRequest.partial().openapi("UpdateServerRequest", {
  description: "Payload to update an existing server; all fields are optional."
});

export type UpdateServerRequest = z.infer<typeof updateServerRequest>;

export const healthCheckResponse = z
  .object({
    uid: z.string().describe("Server unique identifier"),
    online: z.boolean().default(false).describe("Whether the server is currently reachable/online")
  })
  .openapi("HealthCheckResponse", { description: "Health/check status result for a server." });

export type HealthCheckResponse = z.infer<typeof healthCheckResponse>;

export const healthCheckAllResponse = z
  .array(healthCheckResponse)
  .openapi("HealthCheckAllResponse", {
    description: "Array of health check results for all configured servers."
  });

export type HealthCheckAllResponse = z.infer<typeof healthCheckAllResponse>;

export const healthCheckRequest = z
  .object({
    ipAddress: z.string().min(3).describe("IP address or hostname to validate"),
    port: z.number().int().min(1).max(65535).default(22).describe("SSH port to validate"),
    username: z.string().min(1).describe("Username for validation attempt"),
    password: z.string().min(1).describe("Password for validation attempt")
  })
  .openapi("HealthCheckRequest", {
    description: "Request payload to validate server connection details without persisting them."
  });

export type HealthCheckRequest = z.infer<typeof healthCheckRequest>;
