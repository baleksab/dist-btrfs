import { useIntl } from "react-intl";
import { useSnapshots } from "../../hooks";
import { useEffect, useState } from "react";
import { Select, Skeleton } from "@mantine/core";
import { translations } from "./translations";

type SnapshotSelectorProps = {
  subvolume?: string | null;
  onChange?: (value: string | null) => void;
  value?: string | null;
};

export const SnapshotSelector = ({ subvolume, value, onChange }: SnapshotSelectorProps) => {
  const { formatMessage } = useIntl();
  const [defaultSnapshot, setDefaultSnapshot] = useState<string | null>(null);
  const { snapshots, isLoadingSnapshots } = useSnapshots(subvolume || "");

  const snapshotOptions = snapshots?.map((snapshot) => ({
    value: snapshot.path,
    label: snapshot.name
  }));

  useEffect(() => {
    if (isLoadingSnapshots) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDefaultSnapshot(snapshots?.[0]?.path || "");
  }, [subvolume, snapshots, isLoadingSnapshots]);

  if (isLoadingSnapshots) {
    return <Skeleton height={32} />;
  }

  return (
    <Select
      data={snapshotOptions}
      onChange={onChange}
      value={value || defaultSnapshot}
      label={formatMessage(translations.selectedSnapshot)}
    />
  );
};
