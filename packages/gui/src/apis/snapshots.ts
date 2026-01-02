import type { RawAxiosRequestConfig } from "axios";
import {
  SnapshotsApi,
  type BtrfsSnapshotCleanupRequest,
  type BtrfsSnapshotFullReplicationRequest,
  type BtrfsSnapshotIncrementalReplicationRequest
} from "../generated-types";
import { axiosInstance } from "./axiosInstance";

const snapshotsApi = new SnapshotsApi(undefined, undefined, axiosInstance);

export const createSnapshot = async (subvolume: string) => {
  const { data } = await snapshotsApi.apiSnapshotsSubvolumePost(subvolume);

  return data;
};

export const getSnapshots = async (subvolume: string, serverUid?: string) => {
  const { data } = await snapshotsApi.apiSnapshotsSubvolumeGet(subvolume, serverUid);

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

export const cleanupSnapshots = async (subvolume: string, request: BtrfsSnapshotCleanupRequest) => {
  const { data } = await snapshotsApi.apiSnapshotsSubvolumeDelete(subvolume, request);

  return data;
};

export const fullReplication = async (
  subvolume: string,
  snapshot: string,
  request: BtrfsSnapshotFullReplicationRequest,
  options?: RawAxiosRequestConfig
) => {
  const { data } = await snapshotsApi.apiSnapshotsSubvolumeSnapshotReplicationFullPost(
    subvolume,
    snapshot,
    request,
    options
  );

  return data;
};

export const incrementalReplication = async (
  subvolume: string,
  snapshot: string,
  request: BtrfsSnapshotIncrementalReplicationRequest,
  options?: RawAxiosRequestConfig
) => {
  const { data } = await snapshotsApi.apiSnapshotsSubvolumeSnapshotReplicationIncrementalPost(
    subvolume,
    snapshot,
    request,
    options
  );

  return data;
};
