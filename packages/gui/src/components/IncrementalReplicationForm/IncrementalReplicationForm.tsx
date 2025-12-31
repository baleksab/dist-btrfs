import { Stack, Text } from "@mantine/core";
import { useState } from "react";
import { SecondaryServerSelector } from "../SecondaryServerSelector";
import { SubvolumeSelector } from "../SubvolumeSelector";
import { useSubvolumeHealthCheck } from "../../hooks";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { Dots } from "../Dots";

export const IncrementalReplicationForm = () => {
  const { formatMessage } = useIntl();
  const [selectedSecondaryServer, setSelectedSecondaryServer] = useState<string>();
  const [selectedSubvolume, setSelectedSubvolume] = useState<string | null>();

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
        />
      )}
      {isCheckingSubvolumeHealth && (
        <>
          <Text>
            {formatMessage(translations.subvolumeHealth, { subvolume: selectedSubvolume })}
            <Dots />
          </Text>
        </>
      )}
      {subvolumeHealth === false && <Text>{formatMessage(translations.subvolumeHealthFail)}</Text>}
    </Stack>
  );
};
