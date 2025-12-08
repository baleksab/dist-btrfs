import { Stack } from "@mantine/core";
import { PageHeader } from "../../components";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { SubvolumeSelector } from "../../components";

export const ConfigurationPage = () => {
  const { formatMessage } = useIntl();

  return (
    <Stack>
      <PageHeader title={formatMessage(translations.title)} />
      <SubvolumeSelector />
    </Stack>
  );
};
