import { Stack } from "@mantine/core";
import { useIntl } from "react-intl";
import { PageHeader } from "../../components";
import { translations } from "./translations";

export const ReportsAndMetricsPage = () => {
  const { formatMessage } = useIntl();

  return (
    <Stack>
      <PageHeader title={formatMessage(translations.title)} />
    </Stack>
  );
};
