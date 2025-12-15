import { Stack, Tabs, Fieldset } from "@mantine/core";
import {
  PageHeader,
  SubvolumeSelector,
  ConfigurationForm,
  SubvolumeConfigs,
  RetentionConfigurationForm,
  SubvolumeRetentionConfigs
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
      <Tabs defaultValue="snapshots">
        <Tabs.List>
          <Tabs.Tab value="snapshots">{formatMessage(translations.snapshotsTab)}</Tabs.Tab>
          <Tabs.Tab value="retention">{formatMessage(translations.retentionTab)}</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="snapshots" pt="md">
          <Stack>
            <Fieldset legend={formatMessage(translations.automaticSnapshotPolicy)}>
              <SubvolumeSelector value={selectedSubvolume} onChange={setSelectedSubvolume} />
              <ConfigurationForm subvolume={selectedSubvolume || ""} />
            </Fieldset>

            <Fieldset legend={formatMessage(translations.configuredSubvolumes)}>
              <SubvolumeConfigs />
            </Fieldset>
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel value="retention" pt="md">
          <Stack>
            <Fieldset legend={formatMessage(translations.automaticRetentionPolicy)}>
              <SubvolumeSelector
                value={selectedRetentionSubvolume}
                onChange={setSelectedRetentionSubvolume}
              />
              <RetentionConfigurationForm subvolume={selectedRetentionSubvolume || ""} />
            </Fieldset>
            <Fieldset legend={formatMessage(translations.configuredRetentionSubvolumes)}>
              <SubvolumeRetentionConfigs />
            </Fieldset>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};
