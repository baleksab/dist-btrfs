import { Stack } from "@mantine/core";
import { PageHeader } from "../../components";
import { translations } from "./translations";
import { useIntl } from "react-intl";
import { HealthReport, StorageMetrics } from "./components";

export const ReportsAndMetricsPage = () => {
  const { formatMessage } = useIntl();

  return (
    <Stack>
      <PageHeader title={formatMessage(translations.title)} />
      <HealthReport />
      <StorageMetrics />
    </Stack>
  );
};
