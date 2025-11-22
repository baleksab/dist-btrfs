import type { NewContainer } from "../db/types";
import { createContainer } from "../repositories/container.repository";

export async function createContainerService(data: NewContainer) {
  const container = await createContainer({
    ...data,
    isEnabled: data.isEnabled ?? 1,
    isPrimary: data.isPrimary ?? 0
  });

  return container;
}