import type { RawAxiosRequestConfig } from "axios";
import {
  BtrfsApi,
  type BtrfsSubvolumeSetConfigRequest,
  type BtrfsSubvolumeSetRetentionConfigRequest
} from "../generated-types";
import { axiosInstance } from "./axiosInstance";

const btrfsApi = new BtrfsApi(undefined, undefined, axiosInstance);

export const getAllSubvolumes = async (serverUid?: string) => {
  const { data } = await btrfsApi.apiBtrfsSubvolumesGet(serverUid);

  return data;
};

export const getSubvolumeConfig = async (subvolume: string) => {
  const { data } = await btrfsApi.apiBtrfsSubvolumesSubvolumeConfigGet(subvolume);

  return data;
};

export const getSubvolumeConfigAll = async () => {
  const { data } = await btrfsApi.apiBtrfsSubvolumesConfigGet();

  return data;
};

export const updateSubvolumeConfig = async (
  subvolume: string,
  config: BtrfsSubvolumeSetConfigRequest
) => {
  const { data } = await btrfsApi.apiBtrfsSubvolumesSubvolumeConfigPost(subvolume, config);

  return data;
};

export const getSubvolumeRetentionConfig = async (subvolume: string) => {
  const { data } = await btrfsApi.apiBtrfsSubvolumesSubvolumeRetentionConfigGet(subvolume);

  return data;
};

export const getSubvolumeRetentionConfigAll = async () => {
  const { data } = await btrfsApi.apiBtrfsSubvolumesRetentionConfigGet();

  return data;
};

export const updateSubvolumeRetentionConfig = async (
  subvolume: string,
  config: BtrfsSubvolumeSetRetentionConfigRequest
) => {
  const { data } = await btrfsApi.apiBtrfsSubvolumesSubvolumeRetentionConfigPost(subvolume, config);

  return data;
};

export const checkSubvolumeHealth = async (
  subvolume: string,
  serverUid?: string,
  options?: RawAxiosRequestConfig
) => {
  const { data } = await btrfsApi.apiBtrfsSubvolumesSubvolumeHealthGet(
    subvolume,
    serverUid,
    options
  );

  return data;
};
