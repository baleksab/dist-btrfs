import { axiosInstance } from "./axiosInstance";
import {
  RemoteServersApi,
  type CreateNewServerRequest,
  type DeleteServerRequest,
  type UpdateServerRequest
} from "../generated-types";

const remoteServersApi = new RemoteServersApi(undefined, undefined, axiosInstance);

export const createRemoteServer = async (request: CreateNewServerRequest) => {
  const { data } = await remoteServersApi.serversPost(request);

  return data;
};

export const getAllRemoteServers = async () => {
  const { data } = await remoteServersApi.serversGet();

  return data;
};

export const deleteRemoteServer = (request: DeleteServerRequest) => {
  return remoteServersApi.serversDelete(request);
};

export const updateRemoteServer = async ({
  uid,
  request
}: {
  uid: string;
  request: UpdateServerRequest;
}) => {
  const { data } = await remoteServersApi.serversUidPut(uid, request);

  return data;
};
