import { Anchor, Button, Fieldset, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { SecondaryServerSelector } from "../SecondaryServerSelector";
import { SubvolumeSelector } from "../SubvolumeSelector";
import { useSnapshots, useSubvolumeHealthCheck } from "../../hooks";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { Dots } from "../Dots";
import { SnapshotSelector } from "../SnapshotSelector";
import { useRouter } from "@tanstack/react-router";
import { formatMinutesDuration } from "../../utils";

type IncrementalReplicationFormProps = {
  onNavigateToFullReplication?: () => void;
};

export const IncrementalReplicationForm = ({
  onNavigateToFullReplication
}: IncrementalReplicationFormProps) => {
  const { formatMessage, locale } = useIntl();
  const { navigate } = useRouter();
  const [selectedSecondaryServer, setSelectedSecondaryServer] = useState<string>();
  const [selectedSubvolume, setSelectedSubvolume] = useState<string | null>();
  const [selectedSnapshot, setSelectedSnapshot] = useState<string | null>();
  const [selectedNewSnapshot, setSelectedNewSnapshot] = useState<string | null>();

  const { subvolumeHealth, isCheckingSubvolumeHealth } = useSubvolumeHealthCheck(
    selectedSubvolume || ""
  );

  const { snapshots: secondarySnapshots } = useSnapshots(
    selectedSubvolume || "",
    selectedSecondaryServer
  );
  const { snapshots: primarySnapshots } = useSnapshots(selectedSubvolume || "");

  const snapshot = secondarySnapshots?.find((snapshot) => snapshot.path === selectedSnapshot);
  const newSnapshot = primarySnapshots?.find((snapshot) => snapshot.path === selectedNewSnapshot);

  return (
    <Stack>
      <SecondaryServerSelector
        type="single"
        onChange={(event) => setSelectedSecondaryServer(event?.[0])}
        value={selectedSecondaryServer ? [selectedSecondaryServer] : []}
      />
      {selectedSecondaryServer && (
        <SubvolumeSelector
          serverUid={selectedSecondaryServer}
          value={selectedSubvolume}
          onChange={setSelectedSubvolume}
          noSubvolumesMessage={formatMessage(translations.noSubvolumes)}
        />
      )}
      {selectedSubvolume && isCheckingSubvolumeHealth && (
        <>
          <Text>
            {formatMessage(translations.subvolumeHealth, { subvolume: selectedSubvolume })}
            <Dots />
          </Text>
        </>
      )}
      {subvolumeHealth === false && (
        <Text>
          {formatMessage(translations.subvolumeHealthFail, { subvolume: selectedSubvolume })}
        </Text>
      )}
      {subvolumeHealth === true && (
        <SnapshotSelector
          label={formatMessage(translations.secondaryServerSnapshot)}
          subvolume={selectedSubvolume}
          serverUid={selectedSecondaryServer}
          value={selectedSnapshot}
          onChange={setSelectedSnapshot}
          noSnapshotsMessage={formatMessage(translations.noSnapshots, {
            nav: (text) => <Anchor onClick={onNavigateToFullReplication}>{text}</Anchor>
          })}
        />
      )}
      {snapshot && (
        <Fieldset legend={formatMessage(translations.secondarySnapshot)}>
          <Stack gap="xs">
            <Text size="sm">
              <strong>{formatMessage(translations.snapshotName)}:</strong> {snapshot.name}
            </Text>
            <Text size="sm">
              <strong>{formatMessage(translations.snapshotCreated)}:</strong>&nbsp;
              {snapshot.createdAt ? new Date(snapshot.createdAt).toLocaleString() : "-"}
            </Text>
            <Text size="sm">
              <strong>{formatMessage(translations.snapshotSize)}:</strong>&nbsp;
              {snapshot.sizeBytes != null
                ? `${(snapshot.sizeBytes / 1024 / 1024).toFixed(2)} MB`
                : "-"}
            </Text>
          </Stack>
        </Fieldset>
      )}
      {selectedSnapshot && (
        <SnapshotSelector
          label={formatMessage(translations.primaryServerSnapshot)}
          subvolume={selectedSubvolume}
          value={selectedNewSnapshot}
          onChange={setSelectedNewSnapshot}
          noSnapshotsMessage={formatMessage(translations.noNewerSnapshots, {
            nav: (text) => <Anchor onClick={() => navigate({ to: "/snapshots" })}>{text}</Anchor>
          })}
          dateFilter={snapshot?.createdAt ? new Date(snapshot?.createdAt) : undefined}
        />
      )}
      {newSnapshot && (
        <Fieldset legend={formatMessage(translations.primarySnapshot)}>
          <Stack gap="xs">
            <Text size="sm">
              <strong>{formatMessage(translations.snapshotName)}:</strong> {newSnapshot.name}
            </Text>
            <Text size="sm">
              <strong>{formatMessage(translations.snapshotCreated)}:</strong>&nbsp;
              {newSnapshot.createdAt ? new Date(newSnapshot.createdAt).toLocaleString() : "-"}
            </Text>
            <Text size="sm">
              <strong>{formatMessage(translations.snapshotSize)}:</strong>&nbsp;
              {newSnapshot.sizeBytes != null
                ? `${(newSnapshot.sizeBytes / 1024 / 1024).toFixed(2)} MB`
                : "-"}
            </Text>
          </Stack>
        </Fieldset>
      )}
      {snapshot && newSnapshot && (
        <>
          <Fieldset legend={formatMessage(translations.deltaTitle)}>
            <Stack gap="xs">
              <Text size="sm">
                <strong>{formatMessage(translations.deltaTimeGap)}:</strong>&nbsp;
                {formatMinutesDuration(
                  Math.round(
                    (new Date(newSnapshot.createdAt || new Date()).getTime() -
                      new Date(snapshot.createdAt || new Date()).getTime()) /
                      1000 /
                      60
                  ),
                  locale
                )}
              </Text>
              <Text size="sm">
                <strong>{formatMessage(translations.deltaTransferEstimate)}:</strong>&nbsp;
                {snapshot.sizeBytes != null &&
                newSnapshot.sizeBytes != null &&
                newSnapshot.sizeBytes - snapshot.sizeBytes > 0
                  ? `${((newSnapshot.sizeBytes - snapshot.sizeBytes) / 1024 / 1024).toFixed(2)} MB`
                  : formatMessage(translations.deltaDepends)}
              </Text>
              <Text size="sm">
                <strong>{formatMessage(translations.incrementalExplanation)}</strong>
              </Text>
            </Stack>
          </Fieldset>
          <Button>{formatMessage(translations.replicate)}</Button>
        </>
      )}
    </Stack>
  );
};
