import { axiosInstance } from "./axiosInstance";
import {
  RemoteServersApi,
  type CreateNewServerRequest,
  type UpdateServerRequest
} from "../generated-types";

const remoteServersApi = new RemoteServersApi(undefined, undefined, axiosInstance);

export const createRemoteServer = async (request: CreateNewServerRequest) => {
  const { data } = await remoteServersApi.apiServersPost(request);

  return data;
};

export const getAllRemoteServers = async () => {
  const { data } = await remoteServersApi.apiServersGet();

  return data;
};

export const deleteRemoteServer = ({ uid }: { uid: string }) => {
  return remoteServersApi.apiServersUidDelete(uid);
};

export const updateRemoteServer = async ({
  uid,
  request
}: {
  uid: string;
  request: UpdateServerRequest;
}) => {
  const { data } = await remoteServersApi.apiServersUidPut(uid, request);

  return data;
};

export const getHealthChecks = async () => {
  const { data } = await remoteServersApi.apiServersHealthCheckGet();

  return data;
};
