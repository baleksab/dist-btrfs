import { defineMessages } from "react-intl";

export const translations = defineMessages({
  subvolPathLabel: {
    id: "components.subvolumeConfigs.subvolPath",
    defaultMessage: "Subvolume path"
  },
  snapshotIntervalLabel: {
    id: "components.subvolumeConfigs.snapshotInterval",
    defaultMessage: "Snapshot interval (seconds)"
  },
  status: {
    id: "components.subvolumeConfigs.status",
    defaultMessage: "Status"
  },
  enabled: {
    id: "components.subvolumeConfigs.enabled",
    defaultMessage: "Enabled"
  },
  disabled: {
    id: "components.subvolumeConfigs.disabled",
    defaultMessage: "Disabled"
  },
  noConfiguredSubvolumes: {
    id: "components.subvolumeConfigs.empty",
    defaultMessage: "No configured subvolumes"
  }
});
