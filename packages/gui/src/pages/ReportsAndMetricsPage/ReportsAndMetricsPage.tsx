import { Stack } from "@mantine/core";
import { PageHeader } from "../../components";
import { translations } from "./translations";
import { useIntl } from "react-intl";
import { HealthReport, StorageMetrics, SubvolumeStorageMetrics } from "./components";

export const ReportsAndMetricsPage = () => {
  const { formatMessage } = useIntl();

  return (
    <Stack>
      <PageHeader title={formatMessage(translations.title)} />
      <HealthReport />
      <StorageMetrics />
      <SubvolumeStorageMetrics />
    </Stack>
  );
};
