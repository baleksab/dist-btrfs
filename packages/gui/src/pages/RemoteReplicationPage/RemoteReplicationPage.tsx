import { Stack } from "@mantine/core";
import { PageHeader } from "../../components";
import { useIntl } from "react-intl";
import { translations } from "./translations";

export const RemoteReplicationPage = () => {
  const { formatMessage } = useIntl();

  return (
    <Stack>
      <PageHeader title={formatMessage(translations.title)} />
    </Stack>
  );
};
