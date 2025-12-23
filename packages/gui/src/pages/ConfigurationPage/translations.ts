import { defineMessages } from "react-intl";

export const translations = defineMessages({
  title: {
    id: "pages.configurationPage.title",
    defaultMessage: "Primary server - automation"
  },
  snapshotsTab: {
    id: "pages.configurationPage.tabs.snapshots",
    defaultMessage: "Snapshots"
  },
  retentionTab: {
    id: "pages.configurationPage.tabs.retention",
    defaultMessage: "Retention"
  },
  automaticSnapshotPolicy: {
    id: "pages.configurationPage.automaticSnapshotPolicy",
    defaultMessage: "Automatic snapshot policy"
  },
  configuredSubvolumes: {
    id: "pages.configurationPage.configuredSubvolumes",
    defaultMessage: "Configured automatic snapshot policies"
  },
  configuredRetentionSubvolumes: {
    id: "pages.configurationPage.configuredRetentionSubvolumes",
    defaultMessage: "Configured automatic retention policies"
  },
  automaticRetentionPolicy: {
    id: "pages.configurationPage.automaticRetentionPolicy",
    defaultMessage: "Automatic retention policy"
  }
});
