import { createFileRoute } from "@tanstack/react-router";
import { ReportsAndMetricsPage } from "../pages";

export const Route = createFileRoute("/reportsAndMetrics")({
  component: ReportsAndMetricsPage
});
