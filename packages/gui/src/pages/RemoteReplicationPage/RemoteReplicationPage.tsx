import { Stack, Tabs } from "@mantine/core";
import { FullReplicationForm, IncrementalReplicationForm, PageHeader } from "../../components";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { useState } from "react";

export const RemoteReplicationPage = () => {
  const [tab, setTab] = useState<string | null>("full");
  const { formatMessage } = useIntl();

  return (
    <Stack>
      <PageHeader title={formatMessage(translations.title)} />
      <Tabs value={tab} onChange={setTab}>
        <Tabs.List>
          <Tabs.Tab value="full">{formatMessage(translations.fullTab)}</Tabs.Tab>
          <Tabs.Tab value="incremental">{formatMessage(translations.incrementalTab)}</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="full" pt="md" pb="md">
          <FullReplicationForm />
        </Tabs.Panel>
        <Tabs.Panel value="incremental" pt="md" pb="md">
          <IncrementalReplicationForm onNavigateToFullReplication={() => setTab("full")} />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};
