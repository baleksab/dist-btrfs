import { MultiSelect, Select, Skeleton } from "@mantine/core";
import { useRemoteServers } from "../../hooks";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { useEffect, useRef } from "react";

type SecondaryServerSelectorProps = {
  onChange?: (uid: string[]) => void;
  value?: string[] | null;
  type?: "multi" | "single";
};

export const SecondaryServerSelector = ({
  value,
  onChange,
  type = "multi"
}: SecondaryServerSelectorProps) => {
  const { formatMessage } = useIntl();
  const initialDataSetRef = useRef<boolean>(false);

  const { remoteServers, isLoadingRemoteServers } = useRemoteServers();

  const remoteServerOptions = remoteServers
    ?.filter((remoteServer) => !remoteServer.isPrimary)
    ?.map((remoteServer) => ({
      value: remoteServer.uid,
      label: `${remoteServer.ipAddress}/${remoteServer.port}`
    }));

  useEffect(() => {
    if (type === "multi" || initialDataSetRef.current || !remoteServerOptions?.length) {
      return;
    }

    initialDataSetRef.current = true;
    onChange?.(remoteServerOptions?.[0]?.value ? [remoteServerOptions[0]?.value] : []);
  }, [onChange]);

  if (isLoadingRemoteServers) {
    return <Skeleton height={32} />;
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
