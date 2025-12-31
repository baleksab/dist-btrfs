import { MultiSelect, Select, Skeleton, Text } from "@mantine/core";
import { useRemoteServers } from "../../hooks";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { useEffect, type ReactNode } from "react";

type SecondaryServerSelectorProps = {
  onChange?: (uid: string[]) => void;
  value?: string[] | null;
  type?: "multi" | "single";
  noSecondaryServersMessage?: string | ReactNode;
};

export const SecondaryServerSelector = ({
  value,
  onChange,
  type = "multi",
  noSecondaryServersMessage
}: SecondaryServerSelectorProps) => {
  const { formatMessage } = useIntl();

  const { remoteServers, isLoadingRemoteServers } = useRemoteServers();

  const remoteServerOptions = remoteServers
    ?.filter((remoteServer) => !remoteServer.isPrimary)
    ?.map((remoteServer) => ({
      value: remoteServer.uid,
      label: `${remoteServer.ipAddress}/${remoteServer.port}`
    }));

  useEffect(() => {
    if (type === "multi" || !remoteServerOptions?.length) {
      return;
    }

    onChange?.(remoteServerOptions?.[0]?.value ? [remoteServerOptions[0]?.value] : []);

    return () => onChange?.([]);
  }, [onChange, remoteServerOptions]);

  if (isLoadingRemoteServers) {
    return <Skeleton height={32} />;
  }

  if (!remoteServerOptions?.length && noSecondaryServersMessage) {
    return <Text>{noSecondaryServersMessage}</Text>;
  }

  if (type === "single") {
    return (
      <Select
        label={formatMessage(translations.labelSingle)}
        data={remoteServerOptions}
        value={value?.[0]}
        onChange={(event) => onChange?.(event ? [event] : [])}
        allowDeselect={false}
      />
    );
  }

  return (
    <MultiSelect
      label={formatMessage(translations.labelMulti)}
      data={remoteServerOptions}
      value={value || []}
      onChange={onChange}
    />
  );
};
