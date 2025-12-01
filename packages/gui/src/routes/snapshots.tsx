import { createFileRoute } from "@tanstack/react-router";
import { SnapshotsPage } from "../pages/SnapshotsPage";

export const Route = createFileRoute("/snapshots")({
  component: SnapshotsPage
});
