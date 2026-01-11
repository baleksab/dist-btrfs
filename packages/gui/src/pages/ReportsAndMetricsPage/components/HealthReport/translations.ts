import { defineMessages } from "react-intl";

export const translations = defineMessages({
  snapshotsHealth: {
    defaultMessage: "Snapshots Health",
    id: "pages.reportsAndMetricsPage.components.healthReport.snapshotsHealth"
  },
  noSnapshots: {
    defaultMessage: "This subvolume has no snapshots, please add them to see metrics.",
    id: "pages.reportsAndMetricsPage.components.healthReport.noSnapshots"
  }
});
