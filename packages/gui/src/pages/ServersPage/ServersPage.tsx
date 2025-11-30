import { useState } from "react";
import { Title, Button, Divider, SimpleGrid, LoadingOverlay, Text } from "@mantine/core";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { AddServerModal } from "../../components/AddServerModal";
import styles from "./ServersPage.module.scss";
import { useRemoteServers } from "../../hooks";
import { ServerCard } from "../../components/ServerCard";
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

  if (isPending) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <div className={styles.header}>
        <Title order={2}>{formatMessage(translations.title)}</Title>

        <Button onClick={() => setAddServerModalOpen(true)}>
          {formatMessage(translations.addServer)}
        </Button>
      </div>

      <Divider />

      <div className={styles.content}>
        {servers?.length === 0 ? (
          <Text c="dimmed" mt="md">
            {formatMessage(translations.noServers)}
          </Text>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mt="md">
            {servers
              ?.slice()
              ?.sort((a, b) => Number(b?.isPrimary) - Number(a?.isPrimary))
              ?.map((server) => (
                <ServerCard key={server.uid} server={server} onEdit={handleEdit} />
              ))}
          </SimpleGrid>
        )}
      </div>
      <AddServerModal
        key={isAddServerModalOpen ? "open" : "closed"}
        opened={isAddServerModalOpen}
        server={serverToBeEdited}
        onClose={handleClose}
      />
    </>
  );
};
