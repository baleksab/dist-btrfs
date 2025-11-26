import { z } from "zod";

export const createNewServerDto = z.object({
  ipAddress: z.string().min(3),
  username: z.string().min(1),
  password: z.string().min(1),
});

export type CreateNewServerDto = z.infer<typeof createNewServerDto>;