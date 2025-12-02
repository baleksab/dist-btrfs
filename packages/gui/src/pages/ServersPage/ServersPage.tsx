import { useState } from "react";
import { SimpleGrid, LoadingOverlay, Text, Stack } from "@mantine/core";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { AddServerModal } from "../../components/AddServerModal";
import { useHealthChecks, useRemoteServers } from "../../hooks";
import { ServerCard, PageHeader } from "../../components";
import type { GetAllServersResponse } from "../../generated-types";

export const ServersPage = () => {
  const { formatMessage } = useIntl();
  const [isAddServerModalOpen, setAddServerModalOpen] = useState(false);
  const [serverToBeEdited, setServerToBeEdited] = useState<GetAllServersResponse | undefined>(
    undefined
  );

  const handleClose = () => {
    setServerToBeEdited(undefined);
    setAddServerModalOpen(false);
  };

  const handleEdit = (server: GetAllServersResponse) => {
    setServerToBeEdited(server);
    setAddServerModalOpen(true);
  };

  const { data: servers, isPending } = useRemoteServers();
  const { data: healthChecks } = useHealthChecks();

  if (isPending) {
    return <LoadingOverlay visible />;
  }

  return (
    <Stack>
      <PageHeader
        title={formatMessage(translations.title)}
        onClick={() => setAddServerModalOpen(true)}
        buttonLabel={formatMessage(translations.addServer)}
      />

      {servers?.length === 0 ? (
        <Text c="dimmed" mt="md">
          {formatMessage(translations.noServers)}
        </Text>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {servers
            ?.slice()
            ?.sort((a, b) => Number(b?.isPrimary) - Number(a?.isPrimary))
            ?.map((server) => (
              <ServerCard
                key={server.uid}
                server={server}
                onEdit={handleEdit}
                isOnline={healthChecks?.some(
                  (status) => status.uid === server.uid && status.online
                )}
              />
            ))}
        </SimpleGrid>
      )}

      <AddServerModal
        key={isAddServerModalOpen ? "open" : "closed"}
        opened={isAddServerModalOpen}
        server={serverToBeEdited}
        onClose={handleClose}
      />
    </Stack>
  );
};
