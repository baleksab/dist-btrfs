import { Stack, Text } from "@mantine/core";
import { SubvolumeSelector } from "../SubvolumeSelector";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSnapshots } from "../../hooks";
import { SnapshotSelector } from "../SnapshotSelector";
import { translations } from "./translations";
import { SecondaryServerSelector } from "../SecondaryServerSelector";

export const FullReplicationForm = () => {
  const { formatMessage } = useIntl();
  const [selectedSubvolume, setSelectedSubvolume] = useState<string | null>(null);
  const [selectedSnapshot, setSelectedSnapshot] = useState<string | null>(null);
  const [selectedSecondaryServers, setSelectedSecondaryServers] = useState<string[] | null>(null);
  const { snapshots, isLoadingSnapshots } = useSnapshots(selectedSubvolume || "");

  //const snapshot = snapshots?.find((snapshot) => snapshot.path === selectedSnapshot);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedSnapshot(null);
    setSelectedSecondaryServers([]);
  }, [selectedSubvolume]);

  return (
    <Stack p="md">
      <SubvolumeSelector value={selectedSubvolume} onChange={setSelectedSubvolume} />
      {(isLoadingSnapshots || Boolean(snapshots?.length)) && (
        <SnapshotSelector
          subvolume={selectedSubvolume}
          value={selectedSnapshot}
          onChange={setSelectedSnapshot}
        />
      )}
      {snapshots?.length === 0 && <Text>{formatMessage(translations.noSnapshots)}</Text>}
      {Boolean(snapshots?.length) && (
        <>
          <SecondaryServerSelector
            value={selectedSecondaryServers}
            onChange={setSelectedSecondaryServers}
          />
        </>
      )}
    </Stack>
  );
};
