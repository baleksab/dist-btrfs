import { Stack, Text, Fieldset, Button } from "@mantine/core";
import { SubvolumeSelector } from "../SubvolumeSelector";
import { useState } from "react";
import { useIntl } from "react-intl";
import { useFullReplication, useSnapshots } from "../../hooks";
import { SnapshotSelector } from "../SnapshotSelector";
import { translations } from "./translations";
import { SecondaryServerSelector } from "../SecondaryServerSelector/SecondaryServerSelector";
import { ReplicationResults } from "../ReplicationResults";

export const FullReplicationForm = () => {
  const { formatMessage } = useIntl();

  const [selectedSubvolume, setSelectedSubvolume] = useState<string | null>(null);
  const [selectedSnapshot, setSelectedSnapshot] = useState<string | null>(null);
  const [selectedSecondaryServers, setSelectedSecondaryServers] = useState<string[]>([]);

  const { snapshots } = useSnapshots(selectedSubvolume || "");
  const { fullReplicationResults, fullReplicateAsync, isFullyReplicating } = useFullReplication(
    selectedSubvolume || "",
    selectedSnapshot || ""
  );

  const snapshot = snapshots?.find((s) => s.path === selectedSnapshot);

  const hasTargets = (selectedSecondaryServers?.length ?? 0) > 0;

  const buttonDisabled =
    Boolean(selectedSubvolume) && Boolean(selectedSnapshot) && hasTargets && !isFullyReplicating;

  return (
    <Stack>
      <SubvolumeSelector value={selectedSubvolume} onChange={setSelectedSubvolume} />
      <SnapshotSelector
        subvolume={selectedSubvolume}
        value={selectedSnapshot}
        onChange={setSelectedSnapshot}
        noSnapshotsMessage={formatMessage(translations.noSnapshots)}
      />
      {snapshot && (
        <>
          <Fieldset legend={formatMessage(translations.snapshotInfoTitle)}>
            <Stack>
              <Text size="sm">
                <strong>{formatMessage(translations.snapshotNameLabel)}:</strong>&nbsp;
                {snapshot.name}
              </Text>
              <Text size="sm">
                <strong>{formatMessage(translations.snapshotPathLabel)}:</strong>&nbsp;
                {snapshot.path}
              </Text>
              {snapshot.createdAt && (
                <Text size="sm">
                  <strong>{formatMessage(translations.snapshotCreatedAtLabel)}:</strong>&nbsp;
                  {new Date(snapshot.createdAt).toLocaleString()}
                </Text>
              )}
              <Text size="sm">
                <strong>{formatMessage(translations.snapshotSizeLabel)}:</strong>&nbsp;
                {((snapshot.sizeBytes || 0) / 1024 / 1024).toFixed(2)} MB
              </Text>
            </Stack>
          </Fieldset>
          <SecondaryServerSelector
            value={selectedSecondaryServers}
            onChange={setSelectedSecondaryServers}
            noSecondaryServersMessage={formatMessage(translations.noSecondaryServers)}
          />
          <Button
            disabled={!buttonDisabled}
            loading={isFullyReplicating}
            onClick={() =>
              fullReplicateAsync({
                secondaryServers: selectedSecondaryServers
              })
            }
          >
            {formatMessage(translations.replicateButton)}
          </Button>
          {fullReplicationResults && (
            <ReplicationResults results={fullReplicationResults.results} />
          )}
        </>
      )}
    </Stack>
  );
};
