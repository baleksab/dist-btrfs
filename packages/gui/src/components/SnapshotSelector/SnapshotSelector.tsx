import { useIntl } from "react-intl";
import { useSnapshots } from "../../hooks";
import { useEffect, type ReactNode } from "react";
import { Select, Skeleton, Text } from "@mantine/core";
import { translations } from "./translations";

type SnapshotSelectorProps = {
  serverUid?: string;
  subvolume?: string | null;
  onChange?: (value: string | null) => void;
  value?: string | null;
  noSnapshotsMessage?: string | ReactNode;
  dateFilter?: Date;
  label?: string;
};

export const SnapshotSelector = ({
  serverUid,
  subvolume,
  value,
  onChange,
  noSnapshotsMessage,
  dateFilter,
  label
}: SnapshotSelectorProps) => {
  const { formatMessage } = useIntl();
  const { snapshots, isLoadingSnapshots } = useSnapshots(subvolume || "", serverUid);

  const snapshotOptions = snapshots
    ?.filter((snapshot) =>
      dateFilter && snapshot.createdAt ? new Date(snapshot.createdAt) > dateFilter : true
    )
    ?.map((snapshot) => ({
      value: snapshot.path,
      label: snapshot.name
    }));

  useEffect(() => {
    if (!snapshotOptions?.length) {
      return;
    }

    onChange?.(snapshotOptions?.[0]?.value || "");

    return () => onChange?.(null);
  }, [snapshotOptions, onChange]);

  if (isLoadingSnapshots) {
    return <Skeleton height={32} />;
  }

  if (!snapshotOptions?.length && noSnapshotsMessage) {
    return <Text>{noSnapshotsMessage}</Text>;
  }

  return (
    <Select
      data={snapshotOptions}
      onChange={onChange}
      value={value}
      label={label || formatMessage(translations.selectedSnapshot)}
      allowDeselect={false}
    />
  );
};
