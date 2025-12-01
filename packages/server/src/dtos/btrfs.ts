import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const btrfsSubvolumesResponse = z
  .object({
    id: z.number(),
    gen: z.string(),
    topLevel: z.string(),
    path: z.string()
  })
  .openapi("BtrfsSubvolumesResponse");

export type BtrfsSubvolumesResponse = z.infer<typeof btrfsSubvolumesResponse>;
