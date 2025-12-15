import { defineMessages } from "react-intl";

export const translations = defineMessages({
  subvolumePath: {
    id: "components.retentionConfigs.subvolumePath",
    defaultMessage: "Subvolume path"
  },
  retentionType: {
    id: "components.retentionConfigs.retentionType",
    defaultMessage: "Retention type"
  },
  retentionTypeValue: {
    id: "components.retentionConfigs.retentionType.value",
    defaultMessage: "{type}"
  },
  retentionIntervalLabel: {
    id: "components.retentionConfigs.retentionInterval",
    defaultMessage: "Retention interval (seconds)"
  },
  keepLabel: {
    id: "components.retentionConfigs.keep",
    defaultMessage: "Snapshots to keep"
  },
  snapshotCount: {
    id: "components.retentionConfigs.snapshotCount",
    defaultMessage: "{count, plural, one {# snapshot} other {# snapshots}}"
  },
  enabledLabel: {
    id: "components.retentionConfigs.enabled",
    defaultMessage: "Enabled"
  },
  enabled: {
    id: "components.retentionConfigs.enabled.yes",
    defaultMessage: "Enabled"
  },
  disabled: {
    id: "components.retentionConfigs.enabled.no",
    defaultMessage: "Disabled"
  },
  noRetentionConfigs: {
    id: "components.retentionConfigs.empty",
    defaultMessage: "No custom retention configs found"
  },
  retentionTypeDaily: {
    id: "components.retentionConfigs.retentionType.daily",
    defaultMessage: "Daily"
  },
  retentionTypeWeekly: {
    id: "components.retentionConfigs.retentionType.weekly",
    defaultMessage: "Weekly"
  },
  retentionTypeMonthly: {
    id: "components.retentionConfigs.retentionType.monthly",
    defaultMessage: "Monthly"
  }
});
