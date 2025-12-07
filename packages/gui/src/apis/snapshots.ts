import { SnapshotsApi } from "../generated-types";
import { axiosInstance } from "./axiosInstance";

const snapshotsApi = new SnapshotsApi(undefined, undefined, axiosInstance);

export const createSnapshot = async (subvolume: string) => {
  const { data } = await snapshotsApi.apiSnapshotsSubvolumePost(subvolume);

  return data;
};

export const getSnapshots = async (subvolume: string) => {
  const { data } = await snapshotsApi.apiSnapshotsSubvolumeGet(subvolume);

  return data;
};

export const deleteSnapshot = async ({
  subvolume,
  snapshot
}: {
  subvolume: string;
  snapshot: string;
}) => {
  const { data } = await snapshotsApi.apiSnapshotsSubvolumeSnapshotDelete(subvolume, snapshot);

  return data;
};

export const restoreSnapshot = async ({
  subvolume,
  snapshot
}: {
  subvolume: string;
  snapshot: string;
}) => {
  const { data } = await snapshotsApi.apiSnapshotsSubvolumeSnapshotRestorePost(subvolume, snapshot);

  return data;
};
