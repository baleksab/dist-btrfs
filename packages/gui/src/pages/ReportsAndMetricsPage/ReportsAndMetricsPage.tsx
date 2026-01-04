import { Fieldset, Stack } from "@mantine/core";
import {
  PageHeader,
  SnapshotSelector,
  SnapshotsHealthReport,
  SubvolumeSelector
} from "../../components";
import { translations } from "./translations";
import { useState } from "react";
import { useIntl } from "react-intl";

export const ReportsAndMetricsPage = () => {
  const { formatMessage } = useIntl();
  const [selectedSubvolume, setSelectedSubvolume] = useState<string | null>();
  const [selectedSnapshot, setSelectedSnapshot] = useState<string | null>();

  return (
    <Stack>
      <PageHeader title={formatMessage(translations.title)} />
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
    </Stack>
  );
};
