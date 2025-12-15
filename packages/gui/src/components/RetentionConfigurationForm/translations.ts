import { defineMessages } from "react-intl";

export const translations = defineMessages({
  title: {
    id: "components.retentionConfigurationForm.title",
    defaultMessage: "Clean up snapshots"
  },
  type: {
    id: "components.retentionConfigurationForm.type",
    defaultMessage: "Cleanup type:"
  },
  daily: {
    id: "components.retentionConfigurationForm.daily",
    defaultMessage: "Daily"
  },
  weekly: {
    id: "components.retentionConfigurationForm.weekly",
    defaultMessage: "Weekly"
  },
  monthly: {
    id: "components.retentionConfigurationForm.monthly",
    defaultMessage: "Monthly"
  },
  keep: {
    id: "components.retentionConfigurationForm.keep",
    defaultMessage: "Number of snapshots to keep"
  },
  cancel: {
    id: "components.retentionConfigurationForm.cancel",
    defaultMessage: "Cancel"
  },
  apply: {
    id: "components.retentionConfigurationForm.apply",
    defaultMessage: "Apply cleanup"
  }
});
