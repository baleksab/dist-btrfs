import { BtrfsApi, type BtrfsSubvolumeSetConfigRequest } from "../generated-types";
import { axiosInstance } from "./axiosInstance";

const btrfsApi = new BtrfsApi(undefined, undefined, axiosInstance);

export const getAllSubvolumes = async () => {
  const { data } = await btrfsApi.apiBtrfsSubvolumesGet();

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
