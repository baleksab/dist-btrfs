import { Stack } from "@mantine/core";
import { PageHeader } from "../../components";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { SubvolumeSelector } from "../../components";
import { useState } from "react";
import { useSubvolumeConfig } from "../../hooks";

export const ConfigurationPage = () => {
  const { formatMessage } = useIntl();
  const [selectedSubvolume, setSelectedSubvolume] = useState<string | null>(null);

  const { subvolumeConfig, isLoadingSubvolumeConfig } = useSubvolumeConfig(selectedSubvolume || "");

  console.log(subvolumeConfig, isLoadingSubvolumeConfig);

  return (
    <Stack>
      <PageHeader title={formatMessage(translations.title)} />
      <SubvolumeSelector value={selectedSubvolume} onChange={setSelectedSubvolume} />
    </Stack>
  );
};
