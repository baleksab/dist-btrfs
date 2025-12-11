import { Fieldset, Stack } from "@mantine/core";
import {
  PageHeader,
  SubvolumeSelector,
  ConfigurationForm,
  SubvolumeConfigs
} from "../../components";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { useState } from "react";
import { useSubvolumeConfig, useSubvolumeConfigAll } from "../../hooks";

export const ConfigurationPage = () => {
  const { formatMessage } = useIntl();
  const [selectedSubvolume, setSelectedSubvolume] = useState<string | null>(null);

  const { subvolumeConfig } = useSubvolumeConfig(selectedSubvolume || "");
  const { subvolumeConfigs, isLoadingSubvolumeConfigs } = useSubvolumeConfigAll();

  return (
    <Stack>
      <PageHeader title={formatMessage(translations.title)} />
      <SubvolumeSelector value={selectedSubvolume} onChange={setSelectedSubvolume} />
      <Fieldset legend={formatMessage(translations.automaticSnapshotPolicy)}>
        <ConfigurationForm subvolumeConfig={subvolumeConfig} />
      </Fieldset>
      <Fieldset legend={formatMessage(translations.configuredSubvolumes)}>
        <SubvolumeConfigs configs={subvolumeConfigs} isLoading={isLoadingSubvolumeConfigs} />
      </Fieldset>
    </Stack>
  );
};
