import { defineMessages } from "react-intl";

export const translations = defineMessages({
  title: {
    id: "components.snapshotCleanupModal.title",
    defaultMessage: "Clean up snapshots"
  },
  type: {
    id: "components.snapshotCleanupModal.type",
    defaultMessage: "Cleanup type:"
  },
  daily: {
    id: "components.snapshotCleanupModal.daily",
    defaultMessage: "Daily"
  },
  weekly: {
    id: "components.snapshotCleanupModal.weekly",
    defaultMessage: "Weekly"
  },
  monthly: {
    id: "components.snapshotCleanupModal.monthly",
    defaultMessage: "Monthly"
  },
  keep: {
    id: "components.snapshotCleanupModal.keep",
    defaultMessage: "Number of snapshots to keep"
  },
  cancel: {
    id: "components.snapshotCleanupModal.cancel",
    defaultMessage: "Cancel"
  },
  apply: {
    id: "components.snapshotCleanupModal.apply",
    defaultMessage: "Apply cleanup"
  }
});
