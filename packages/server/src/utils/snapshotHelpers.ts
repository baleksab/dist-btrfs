import { BtrfsSnapshotMeta } from "../dtos";

export const parseBtrfsShow = (stdout: string): BtrfsSnapshotMeta => {
  const get = (key: string) =>
    stdout
      .split("\n")
      .find((l) => l.trim().startsWith(key))
      ?.split(key)
      .pop()
      ?.trim();

  return {
    name: get("Name:"),
    uuid: get("UUID:"),
    receivedUuid: get("Received UUID:"),
    parentUuid: get("Parent UUID:"),
    creationTime: get("Creation time:"),
    generation: get("Generation:"),
    subvolumeId: get("Subvolume ID:"),
    flags: get("Flags:")
  };
};

export const parseBtrfsDu = (stdout: string) => {
  const line = stdout
    .split("\n")
    .map((l) => l.trim())
    .find((l) => /^\d/.test(l));

  if (!line) {
    return undefined;
  }

  const parts = line.split(/\s+/);

  return {
    total: parts[0],
    exclusive: parts[1],
    shared: parts[2]
  };
};

export const computeAgeSeconds = (creation?: string) => {
  if (!creation) {
    return undefined;
  }

  const t = new Date(creation).getTime();

  if (isNaN(t)) {
    return undefined;
  }

  return Math.floor((Date.now() - t) / 1000);
};
