import { defineMessages } from "react-intl";

export const translations = defineMessages({
  title: {
    defaultMessage: "Reports & Metrics",
    id: "pages.reportsAndMetricsPage.title"
  },
  snapshotsHealth: {
    defaultMessage: "Snapshots Health",
    id: "pages.reportsAndMetricsPage.snapshotsHealth"
  },
  noSnapshots: {
    defaultMessage: "This subvolume has no snapshots, please add them to see metrics.",
    id: "pages.reportsAndMetricsPage.noSnapshots"
  }
});
