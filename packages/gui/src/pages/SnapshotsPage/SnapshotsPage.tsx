import { LoadingOverlay, Select, Stack, type ComboboxItem } from "@mantine/core";
import { useCreateSnapshot, useSubvolumes } from "../../hooks";
import { PageHeader } from "../../components";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { useEffect, useRef, useState } from "react";

export const SnapshotsPage = () => {
  const { formatMessage } = useIntl();
  const [selectedSubvolume, setSelectedSubvolume] = useState<ComboboxItem | undefined>(undefined);
  const hasSetInitialSubvolume = useRef(false);

  const { subvolumes, isLoadingSubvolumes } = useSubvolumes();
  const { createSnapshotAsync, isCreatingSnapshot } = useCreateSnapshot();

  const subvolumeOptions = subvolumes?.map((subvolume) => ({
    value: subvolume.path.toString(),
    label: subvolume.path
  }));

  useEffect(() => {
    if (hasSetInitialSubvolume.current || !subvolumeOptions?.length) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedSubvolume(subvolumeOptions[0]);
  }, [subvolumes]);

  const handleSnapshotCreate = async () => {
    if (!selectedSubvolume?.value) {
      return;
    }

    await createSnapshotAsync(selectedSubvolume?.value);
  };

  if (isLoadingSubvolumes) {
    return <LoadingOverlay visible />;
  }

  return (
    <Stack>
      <PageHeader
        buttonLabel={formatMessage(translations.addSnapshot)}
        title={formatMessage(translations.title)}
        onClick={handleSnapshotCreate}
        isLoading={isCreatingSnapshot}
      />
      <Select
        data={subvolumeOptions}
        label={formatMessage(translations.subvolumesLabel)}
        value={selectedSubvolume?.value}
        onChange={(_, option) => setSelectedSubvolume(option)}
      />
    </Stack>
  );
};
