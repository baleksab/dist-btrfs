import { Stack, Text, Fieldset, Group, Button, Progress } from "@mantine/core";
import { SubvolumeSelector } from "../SubvolumeSelector";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSnapshots } from "../../hooks";
import { SnapshotSelector } from "../SnapshotSelector";
import { translations } from "./translations";
import { SecondaryServerSelector } from "../SecondaryServerSelector/SecondaryServerSelector";

export const FullReplicationForm = () => {
  const { formatMessage } = useIntl();

  const [selectedSubvolume, setSelectedSubvolume] = useState<string | null>(null);
  const [selectedSnapshot, setSelectedSnapshot] = useState<string | null>(null);
  const [selectedSecondaryServers, setSelectedSecondaryServers] = useState<string[]>([]);
  const [progress, setProgress] = useState<number | null>(null);
  const [isReplicating, setIsReplicating] = useState(false);

  const { snapshots, isLoadingSnapshots } = useSnapshots(selectedSubvolume || "");

  const snapshot = snapshots?.find((s) => s.path === selectedSnapshot);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedSecondaryServers([]);
  }, [selectedSubvolume]);

  const hasTargets = (selectedSecondaryServers?.length ?? 0) > 0;

  const formReady =
    Boolean(selectedSubvolume) && Boolean(selectedSnapshot) && hasTargets && !isReplicating;

  const handleReplicate = () => {
    setIsReplicating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p === null) return 0;
        if (p >= 100) {
          clearInterval(interval);
          setIsReplicating(false);
          return 100;
        }
        return p + 10;
      });
    }, 500);
  };

  return (
    <Stack pt="md" pb="md">
      <SubvolumeSelector value={selectedSubvolume} onChange={setSelectedSubvolume} />
      {!!snapshots?.length && !isLoadingSnapshots && (
        <SnapshotSelector
          subvolume={selectedSubvolume}
          value={selectedSnapshot}
          onChange={setSelectedSnapshot}
        />
      )}
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
          <Button disabled={!formReady} loading={isReplicating} onClick={handleReplicate}>
            {formatMessage(translations.replicateButton)}
          </Button>
          {progress !== null && (
            <Fieldset
              legend={
                <Group>
                  <Text size="sm">{formatMessage(translations.replicationProgressTitle)}</Text>
                  <Text size="sm">{progress}%</Text>
                </Group>
              }
            >
              <Stack>
                <Progress value={progress} size="lg" />
                {isReplicating ? (
                  <Text size="sm" c="dimmed">
                    {formatMessage(translations.replicationRunning)}
                  </Text>
                ) : (
                  <Text size="sm" c="green">
                    {formatMessage(translations.replicationCompleted)}
                  </Text>
                )}
              </Stack>
            </Fieldset>
          )}
        </>
      )}
    </Stack>
  );
};
