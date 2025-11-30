import { useState } from "react";
import { Title, Button, Divider, SimpleGrid, LoadingOverlay, Text } from "@mantine/core";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { AddServerModal } from "../../components/AddServerModal";
import styles from "./ServersPage.module.scss";
import { useRemoteServers } from "../../hooks";
import { ServerCard } from "../../components/ServerCard";

export const ServersPage = () => {
  const { formatMessage } = useIntl();
  const { data: servers, isPending } = useRemoteServers();
  const [isAddServerModalOpen, setAddServerModalOpen] = useState(false);

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
                <ServerCard
                  uid={server.uid}
                  key={server.uid}
                  name={server.name}
                  ipAddress={server.ipAddress}
                  port={server.port}
                  isPrimary={server.isPrimary}
                />
              ))}
          </SimpleGrid>
        )}
      </div>
      <AddServerModal
        key={isAddServerModalOpen ? "open" : "closed"}
        opened={isAddServerModalOpen}
        onClose={() => setAddServerModalOpen(false)}
      />
    </>
  );
};
