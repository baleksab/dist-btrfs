import { useEffect, useRef, useState } from "react";
import { useSubvolumes } from "../../hooks";
import { Select, Skeleton } from "@mantine/core";
import { useIntl } from "react-intl";
import { translations } from "./translations";

type SubvolumeSelectorProps = {
  onChange?: (value: string | null) => void;
  value?: string | null;
};

export const SubvolumeSelector = ({ value, onChange }: SubvolumeSelectorProps) => {
  const hasSetInitialSubvolume = useRef(false);
  const [defaultSubvolume, setDefaultSubvolume] = useState<string | undefined>(undefined);
  const { subvolumes, isLoadingSubvolumes } = useSubvolumes();
  const { formatMessage } = useIntl();

  const subvolumeOptions = subvolumes?.map((subvolume) => ({
    value: subvolume.path.toString(),
    label: subvolume.path
  }));

  useEffect(() => {
    if (hasSetInitialSubvolume.current || !subvolumeOptions?.length) {
      return;
    }

    hasSetInitialSubvolume.current = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDefaultSubvolume(subvolumeOptions[0].value);
    onChange?.(subvolumeOptions[0].value);
  }, [subvolumeOptions]);

  if (isLoadingSubvolumes) {
    return <Skeleton height={32} />;
  }

  return (
    <Select
      data={subvolumeOptions}
      label={formatMessage(translations.subvolumesLabel)}
      onChange={onChange}
      value={value || defaultSubvolume}
    />
  );
};
