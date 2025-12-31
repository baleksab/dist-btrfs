import { useEffect, type ReactNode } from "react";
import { useSubvolumes } from "../../hooks";
import { Select, Skeleton, Text } from "@mantine/core";
import { useIntl } from "react-intl";
import { translations } from "./translations";

type SubvolumeSelectorProps = {
  serverUid?: string;
  onChange?: (value: string | null) => void;
  value?: string | null;
  label?: string;
  noSubvolumesMessage?: string | ReactNode;
};

export const SubvolumeSelector = ({
  serverUid,
  label,
  value,
  onChange,
  noSubvolumesMessage
}: SubvolumeSelectorProps) => {
  const { formatMessage } = useIntl();

  const { subvolumes, isLoadingSubvolumes } = useSubvolumes(serverUid);

  const subvolumeOptions = subvolumes?.map((subvolume) => ({
    value: subvolume.path.toString(),
    label: subvolume.path
  }));

  useEffect(() => {
    if (!subvolumeOptions?.length) {
      return;
    }

    onChange?.(subvolumeOptions[0].value);

    return () => onChange?.(null);
  }, [subvolumeOptions]);

  if (isLoadingSubvolumes) {
    return <Skeleton height={32} />;
  }

  if (!subvolumes?.length && noSubvolumesMessage) {
    return <Text>{noSubvolumesMessage}</Text>;
  }

  return (
    <Select
      data={subvolumeOptions}
      label={label || formatMessage(translations.subvolumesLabel)}
      onChange={onChange}
      value={value}
      allowDeselect={false}
    />
  );
};
