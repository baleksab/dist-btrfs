import { Router } from "express";
import { z } from "zod";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

export const registry = new OpenAPIRegistry();
export const router = Router();

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

type CreateRouteOptions = {
  method: HttpMethod;
  path: string;
  dto?: z.ZodTypeAny;
  handler: any;
  summary?: string;
  tags?: string[];
};

export const createRoute = ({
  method,
  path,
  dto,
  handler,
  summary = "",
  tags = [],
}: CreateRouteOptions) => {
  registry.registerPath({
    method,
    path,
    summary,
    tags,
    request: dto
      ? {
        body: {
          content: {
            "application/json": {
              schema: dto,
            },
          },
        },
      }
      : undefined,
    responses: {
      200: { description: "Success" },
      201: { description: "Created" },
      400: { description: "Bad request" },
      500: { description: "Server error" },
    },
  });

  router[method](path, async (req, res, next) => {
    console.log(req.body);
    try {
      const validatedBody = dto ? dto.parse(req.body) : req.body;
      const result = await handler(validatedBody, req, res);
      if (!res.headersSent) {
        res.json(result);
      }
    } catch (err) {
      next(err);
    }
  });
};
