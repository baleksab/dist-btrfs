import { defineMessages } from "react-intl";

export const translations = defineMessages({
  noSnapshots: {
    id: "components.fullReplicationForm.noSnapshots",
    defaultMessage: "This subvolume has no snapshots, please create some before proceeding."
  },
  snapshotInfoTitle: {
    id: "components.fullReplicationForm.snapshotInfoTitle",
    defaultMessage: "Snapshot info"
  },
  snapshotSelectedBadge: {
    id: "components.fullReplicationForm.snapshotSelectedBadge",
    defaultMessage: "Selected"
  },
  snapshotNameLabel: {
    id: "components.fullReplicationForm.snapshotNameLabel",
    defaultMessage: "Name"
  },
  snapshotPathLabel: {
    id: "components.fullReplicationForm.snapshotPathLabel",
    defaultMessage: "Path"
  },
  snapshotCreatedAtLabel: {
    id: "components.fullReplicationForm.snapshotCreatedAtLabel",
    defaultMessage: "Created at"
  },
  snapshotSizeLabel: {
    id: "components.fullReplicationForm.snapshotSizeLabel",
    defaultMessage: "Size (referenced)"
  },
  willReplicateToTitle: {
    id: "components.fullReplicationForm.willReplicateToTitle",
    defaultMessage: "Will be replicated to"
  },
  noSecondaryServers: {
    id: "components.fullReplicationForm.noSecondaryServers",
    defaultMessage: "No secondary servers selected."
  },
  replicateButton: {
    id: "components.fullReplicationForm.replicateButton",
    defaultMessage: "Replicate"
  },
  replicationResults: {
    id: "components.fullReplicationForm.replicationResults",
    defaultMessage: "Replication results"
  },
  replicationRunning: {
    id: "components.fullReplicationForm.replicationRunning",
    defaultMessage: "Running full replication…"
  },
  replicationCompleted: {
    id: "components.fullReplicationForm.replicationCompleted",
    defaultMessage: "Replication completed"
  },
  serverUidLabel: {
    id: "components.fullReplicationForm.serverUidLabel",
    defaultMessage: "Server UID"
  },
  serverAddressLabel: {
    id: "components.fullReplicationForm.serverAddressLabel",
    defaultMessage: "Address"
  },
  serverPortLabel: {
    id: "components.fullReplicationForm.serverPortLabel",
    defaultMessage: "Port"
  },
  replicationOk: {
    id: "components.fullReplicationForm.replicationOk",
    defaultMessage: "OK"
  },
  replicationFailed: {
    id: "components.fullReplicationForm.replicationFailed",
    defaultMessage: "Failed"
  },
  replicationErrorLabel: {
    id: "components.fullReplicationForm.replicationErrorLabel",
    defaultMessage: "Error"
  }
});
