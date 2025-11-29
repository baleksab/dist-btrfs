import { createFileRoute } from "@tanstack/react-router";
import { ServersPage } from "../pages";

export const Route = createFileRoute("/")({
  component: ServersPage
});