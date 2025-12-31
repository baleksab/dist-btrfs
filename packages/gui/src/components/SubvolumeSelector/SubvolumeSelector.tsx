import { useEffect, useRef } from "react";
import { useSubvolumes } from "../../hooks";
import { Select, Skeleton } from "@mantine/core";
import { useIntl } from "react-intl";
import { translations } from "./translations";

type SubvolumeSelectorProps = {
  serverUid?: string;
  onChange?: (value: string | null) => void;
  value?: string | null;
  label?: string;
};

export const SubvolumeSelector = ({
  serverUid,
  label,
  value,
  onChange
}: SubvolumeSelectorProps) => {
  const { formatMessage } = useIntl();
  const hasSetInitialSubvolume = useRef(false);

  const { subvolumes, isLoadingSubvolumes } = useSubvolumes(serverUid);
  console.log(serverUid);
  const subvolumeOptions = subvolumes?.map((subvolume) => ({
    value: subvolume.path.toString(),
    label: subvolume.path
  }));

  useEffect(() => {
    if (hasSetInitialSubvolume.current || !subvolumeOptions?.length) {
      return;
    }

    hasSetInitialSubvolume.current = true;
    onChange?.(subvolumeOptions[0].value);
  }, [subvolumeOptions]);

  if (isLoadingSubvolumes) {
    return <Skeleton height={32} />;
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
