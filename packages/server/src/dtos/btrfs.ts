import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const btrfsSubvolumesResponse = z
  .array(
    z.object({
      id: z.number(),
      gen: z.string(),
      topLevel: z.string(),
      path: z.string()
    })
  )
  .openapi("BtrfsSubvolumesResponse");

export type BtrfsSubvolumesResponse = z.infer<typeof btrfsSubvolumesResponse>;

export const btrfsSubvolumeConfigResponse = z
  .object({
    id: z.string(),
    serverUid: z.string(),
    subvolPath: z.string(),
    snapshotIntervalSeconds: z.number().positive(),
    isEnabled: z.boolean().default(false)
  })
  .openapi("BtrfsSubvolumeConfigResponse");

export type BtrfsSubvolumeConfigResponse = z.infer<typeof btrfsSubvolumeConfigResponse>;
