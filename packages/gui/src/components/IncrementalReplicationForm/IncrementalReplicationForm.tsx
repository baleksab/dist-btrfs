import { Anchor, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { SecondaryServerSelector } from "../SecondaryServerSelector";
import { SubvolumeSelector } from "../SubvolumeSelector";
import { useSubvolumeHealthCheck } from "../../hooks";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { Dots } from "../Dots";
import { SnapshotSelector } from "../SnapshotSelector";

type IncrementalReplicationFormProps = {
  onNavigateToFullReplication?: () => void;
};

export const IncrementalReplicationForm = ({
  onNavigateToFullReplication
}: IncrementalReplicationFormProps) => {
  const { formatMessage } = useIntl();
  const [selectedSecondaryServer, setSelectedSecondaryServer] = useState<string>();
  const [selectedSubvolume, setSelectedSubvolume] = useState<string | null>();
  const [selectedSnapshot, setSelectedSnapshot] = useState<string | null>();

  const { subvolumeHealth, isCheckingSubvolumeHealth } = useSubvolumeHealthCheck(
    selectedSubvolume || ""
  );

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
        <>
          <SnapshotSelector
            subvolume={selectedSubvolume}
            serverUid={selectedSecondaryServer}
            value={selectedSnapshot}
            onChange={setSelectedSnapshot}
            noSnapshotsMessage={formatMessage(translations.noSnapshots, {
              nav: (text) => <Anchor onClick={onNavigateToFullReplication}>{text}</Anchor>
            })}
          />
        </>
      )}
    </Stack>
  );
};
