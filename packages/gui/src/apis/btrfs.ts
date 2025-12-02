import { BtrfsApi } from "../generated-types";
import { axiosInstance } from "./axiosInstance";

const btrfsApi = new BtrfsApi(undefined, undefined, axiosInstance);

export const getAllSubvolumes = async () => {
  const { data } = await btrfsApi.apiBtrfsSubvolumesGet();

  return data;
};
