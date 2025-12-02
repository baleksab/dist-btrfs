import { LoadingOverlay, Select, Stack } from "@mantine/core";
import { useSubvolumes } from "../../hooks";
import { PageHeader } from "../../components";
import { useIntl } from "react-intl";
import { translations } from "./translations";

export const SnapshotsPage = () => {
  const { formatMessage } = useIntl();
  const { subvolumes, isLoadingSubvolumes } = useSubvolumes();

  const subvolumeOptions = subvolumes?.map((subvolume) => ({
    value: subvolume.id.toString(),
    label: subvolume.path
  }));

  if (isLoadingSubvolumes) {
    return <LoadingOverlay visible />;
  }

  return (
    <Stack>
      <PageHeader
        buttonLabel={formatMessage(translations.addSnapshot)}
        title={formatMessage(translations.title)}
      />
      <Select data={subvolumeOptions} label={formatMessage(translations.subvolumesLabel)} />
    </Stack>
  );
};
