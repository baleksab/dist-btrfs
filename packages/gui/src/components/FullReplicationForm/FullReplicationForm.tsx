import { Stack, Text, Fieldset, Button, Group, Badge } from "@mantine/core";
import { SubvolumeSelector } from "../SubvolumeSelector";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useFullReplication, useSnapshots } from "../../hooks";
import { SnapshotSelector } from "../SnapshotSelector";
import { translations } from "./translations";
import { SecondaryServerSelector } from "../SecondaryServerSelector/SecondaryServerSelector";

export const FullReplicationForm = () => {
  const { formatMessage } = useIntl();

  const [selectedSubvolume, setSelectedSubvolume] = useState<string | null>(null);
  const [selectedSnapshot, setSelectedSnapshot] = useState<string | null>(null);
  const [selectedSecondaryServers, setSelectedSecondaryServers] = useState<string[]>([]);

  const { snapshots, isLoadingSnapshots } = useSnapshots(selectedSubvolume || "");
  const { fullReplicationResults, fullReplicateAsync, isFullyReplicating } = useFullReplication(
    selectedSubvolume || "",
    selectedSnapshot || ""
  );

  const snapshot = snapshots?.find((s) => s.path === selectedSnapshot);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedSecondaryServers([]);
    setSelectedSnapshot(null);
  }, [selectedSubvolume]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedSecondaryServers([]);
  }, [selectedSnapshot]);

  const hasTargets = (selectedSecondaryServers?.length ?? 0) > 0;

  const buttonDisabled =
    Boolean(selectedSubvolume) && Boolean(selectedSnapshot) && hasTargets && !isFullyReplicating;

  return (
    <Stack>
      <SubvolumeSelector value={selectedSubvolume} onChange={setSelectedSubvolume} />
      {(snapshots?.length !== 0 || isLoadingSnapshots) && (
        <SnapshotSelector
          subvolume={selectedSubvolume}
          value={selectedSnapshot}
          onChange={setSelectedSnapshot}
        />
      )}
      {snapshots?.length === 0 && <Text>{formatMessage(translations.noSnapshots)}</Text>}
      {snapshot && !isLoadingSnapshots && (
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
            <Fieldset legend={formatMessage(translations.replicationResults)}>
              <Stack gap="sm">
                {fullReplicationResults.results.map((result) => (
                  <Group
                    key={result.serverUid}
                    justify="space-between"
                    wrap="nowrap"
                    align="flex-start"
                  >
                    <Stack gap={2}>
                      <Text size="sm">
                        <strong>{formatMessage(translations.serverUidLabel)}:</strong>&nbsp;
                        {result.serverUid}
                      </Text>
                      <Text size="sm">
                        <strong>{formatMessage(translations.serverAddressLabel)}:</strong>&nbsp;
                        {result.address}/{result.port ?? 22}
                      </Text>
                    </Stack>
                    <Stack gap={4} align="flex-end">
                      <Badge
                        size="sm"
                        color={result.status === "ok" ? "green" : "red"}
                        variant="filled"
                      >
                        {result.status === "ok"
                          ? formatMessage(translations.replicationOk)
                          : formatMessage(translations.replicationFailed)}
                      </Badge>
                      {result.error && (
                        <Text size="xs" c="dimmed" ta="right">
                          {result.error}
                        </Text>
                      )}
                    </Stack>
                  </Group>
                ))}
              </Stack>
            </Fieldset>
          )}
        </>
      )}
    </Stack>
  );
};
