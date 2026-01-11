import { Fieldset, Stack } from "@mantine/core";
import { useState } from "react";
import { useIntl } from "react-intl";
import { SnapshotSelector, SnapshotsHealthReport, SubvolumeSelector } from "../../../../components";
import { translations } from "./translations";

export const HealthReport = () => {
  const { formatMessage } = useIntl();

  const [selectedSubvolume, setSelectedSubvolume] = useState<string | null>();
  const [selectedSnapshot, setSelectedSnapshot] = useState<string | null>();

  return (
    <Fieldset legend={formatMessage(translations.snapshotsHealth)}>
      <Stack>
        <SubvolumeSelector value={selectedSubvolume} onChange={setSelectedSubvolume} />
        {selectedSubvolume && (
          <SnapshotSelector
            subvolume={selectedSubvolume}
            value={selectedSnapshot}
            onChange={setSelectedSnapshot}
            noSnapshotsMessage={formatMessage(translations.noSnapshots)}
          />
        )}
        {selectedSnapshot && (
          <SnapshotsHealthReport subvolume={selectedSubvolume} snapshot={selectedSnapshot} />
        )}
      </Stack>
    </Fieldset>
  );
};
