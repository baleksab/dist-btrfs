import { createFileRoute } from "@tanstack/react-router";
import { ConfigurationPage } from "../pages";

export const Route = createFileRoute("/configuration")({
  component: ConfigurationPage
});
