import { useState } from "react";
import { Text, Stack, Button } from "@mantine/core";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { AddServerModal } from "../../components/AddServerModal";
import { useHealthChecks, useRemoteServers } from "../../hooks";
import { ServerCard, PageHeader, ServerCardSkeleton } from "../../components";
import type { GetAllServersResponse } from "../../generated-types";

const SKELETON_COUNT = 3;

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

  const { remoteServers, isLoadingRemoteServers } = useRemoteServers();
  const { data: healthChecks } = useHealthChecks();

  return (
    <Stack>
      <PageHeader
        title={formatMessage(translations.title)}
        actions={
          <Button onClick={() => setAddServerModalOpen(true)}>
            {formatMessage(translations.addServer)}
          </Button>
        }
      />
      {isLoadingRemoteServers ? (
        <Stack>
          {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <ServerCardSkeleton key={index} />
          ))}
        </Stack>
      ) : remoteServers?.length === 0 ? (
        <Text mt="md">{formatMessage(translations.noServers)}</Text>
      ) : (
        <Stack flex="column">
          {remoteServers
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
        </Stack>
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
