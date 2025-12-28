import { MultiSelect, Skeleton } from "@mantine/core";
import { useRemoteServers } from "../../hooks";
import { useIntl } from "react-intl";
import { translations } from "./translations";

type SecondaryServerSelectorProps = {
  onChange?: (uid: string[]) => void;
  value?: string[] | null;
};

export const SecondaryServerSelector = ({ value, onChange }: SecondaryServerSelectorProps) => {
  const { formatMessage } = useIntl();
  const { remoteServers, isLoadingRemoteServers } = useRemoteServers();

  const remoteServerOptions = remoteServers
    ?.filter((remoteServer) => !remoteServer.isPrimary)
    ?.map((remoteServer) => ({
      value: remoteServer.uid,
      label: `${remoteServer.ipAddress}/${remoteServer.port}`
    }));

  if (isLoadingRemoteServers) {
    return <Skeleton height={32} />;
  }

  return (
    <MultiSelect
      label={formatMessage(translations.label)}
      data={remoteServerOptions}
      value={value || []}
      onChange={onChange}
    />
  );
};
