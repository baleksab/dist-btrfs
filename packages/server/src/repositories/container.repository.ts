import { db } from "../db/client";
import { containers } from "../db/schema";
import type { NewContainer } from "../db/types";

export const createContainer = async (data: NewContainer) => {
  const result = await db
    .insert(containers)
    .values({
      ...data,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000)
    })
    .returning();

  return result[0];
};
