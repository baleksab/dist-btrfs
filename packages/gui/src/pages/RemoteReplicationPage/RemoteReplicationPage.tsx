import { Stack, Tabs } from "@mantine/core";
import { FullReplicationForm, IncrementalReplicationForm, PageHeader } from "../../components";
import { useIntl } from "react-intl";
import { translations } from "./translations";

export const RemoteReplicationPage = () => {
  const { formatMessage } = useIntl();

  return (
    <Stack>
      <PageHeader title={formatMessage(translations.title)} />
      <Tabs defaultValue="full">
        <Tabs.List>
          <Tabs.Tab value="full">{formatMessage(translations.fullTab)}</Tabs.Tab>
          <Tabs.Tab value="incremental">{formatMessage(translations.incrementalTab)}</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="full" pt="md" pb="md">
          <FullReplicationForm />
        </Tabs.Panel>
        <Tabs.Panel value="incremental" pt="md" pb="md">
          <IncrementalReplicationForm />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};
