import { defineMessages } from "react-intl";

export const translations = defineMessages({
  subvolumeHealth: {
    id: "components.incrementalReplicationForm.subvolumeHealth",
    defaultMessage: "Checking if {subvolume} exists on the primary server"
  },
  subvolumeHealthFail: {
    id: "components.incrementalReplicationForm.subvolumeHealthFail",
    defaultMessage: "{subvolume} does not exist on  the primary server!"
  }
});
