import { axiosInstance } from "./axiosInstance";
import { RemoteServersApi, type CreateNewServerRequest } from "../generated-types";

const remoteServersApi = new RemoteServersApi(undefined, undefined, axiosInstance);

export const createRemoteServer = (request: CreateNewServerRequest) => {
  return remoteServersApi.serversPost(request);
};

export const getAllRemoteServers = async () => {
  const { data } = await remoteServersApi.serversGet();

  return data;
};