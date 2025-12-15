import { Fieldset, Stack } from "@mantine/core";
import {
  PageHeader,
  SubvolumeSelector,
  ConfigurationForm,
  SubvolumeConfigs,
  RetentionConfigurationForm
} from "../../components";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { useState } from "react";

export const ConfigurationPage = () => {
  const { formatMessage } = useIntl();

  const [selectedSubvolume, setSelectedSubvolume] = useState<string | null>(null);
  const [selectedRetentionSubvolume, setSelectedRetentionSubvolume] = useState<string | null>(null);

  return (
    <Stack>
      <PageHeader title={formatMessage(translations.title)} />
      <Fieldset legend={formatMessage(translations.automaticSnapshotPolicy)}>
        <SubvolumeSelector value={selectedSubvolume} onChange={setSelectedSubvolume} />
        <ConfigurationForm subvolume={selectedSubvolume || ""} />
      </Fieldset>
      <Fieldset legend={formatMessage(translations.configuredSubvolumes)}>
        <SubvolumeConfigs />
      </Fieldset>
      <Fieldset legend={formatMessage(translations.automaticRetentionPolicy)}>
        <SubvolumeSelector
          value={selectedRetentionSubvolume}
          onChange={setSelectedRetentionSubvolume}
        />
        <RetentionConfigurationForm subvolume={selectedRetentionSubvolume || ""} />
      </Fieldset>
    </Stack>
  );
};
