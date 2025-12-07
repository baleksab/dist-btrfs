import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";

extendZodWithOpenApi(z);

export const btrfsSnapshotResponse = z
  .object({
    name: z.string(),
    path: z.string(),
    createdAt: z.string().optional(),
    sizeBytes: z.number().optional()
  })
  .openapi("BtrfsSnapshotResponse");

export type BtrfsSnapshotResponse = z.infer<typeof btrfsSnapshotResponse>;

export const btrfsSnapshotsResponse = z
  .array(btrfsSnapshotResponse)
  .openapi("BtrfsSnapshotsResponse");

export type BtrfsSnapshotsResponse = z.infer<typeof btrfsSnapshotsResponse>;

export const btrfsSnapshotDeleteResponse = z.object({
  path: z.string(),
  deleted: z.boolean(),
  message: z.string()
});

export type BtrfsSnapshotDeleteResponse = z.infer<typeof btrfsSnapshotDeleteResponse>;
