import { createFileRoute } from "@tanstack/react-router";
import { RemoteReplicationPage } from "../pages";

export const Route = createFileRoute("/remoteReplication")({
  component: RemoteReplicationPage
});
