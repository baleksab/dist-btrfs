import { Button, NumberInput, Stack, Switch } from "@mantine/core";
import { useForm } from "@tanstack/react-form";
import { useIntl } from "react-intl";
import type {
  BtrfsSubvolumeConfigResponse,
  BtrfsSubvolumeSetConfigRequest
} from "../../generated-types";
import { translations } from "./translations";
import { useEffect } from "react";
import { useUpdateSubvolumeConfig } from "../../hooks";

type ConfigurationFormProps = {
  subvolumeConfig?: BtrfsSubvolumeConfigResponse;
};

export const ConfigurationForm = ({ subvolumeConfig }: ConfigurationFormProps) => {
  const { formatMessage } = useIntl();

  const { updateSubvolumeConfigAsync, isUpdatingSubvolumeConfig } = useUpdateSubvolumeConfig(
    subvolumeConfig?.subvolPath || ""
  );

  const form = useForm({
    defaultValues: {
      subvolPath: "",
      snapshotIntervalSeconds: 3600,
      isEnabled: false
    } as BtrfsSubvolumeSetConfigRequest,
    onSubmit: ({ value }) => {
      updateSubvolumeConfigAsync(value);
    }
  });

  useEffect(() => {
    if (!subvolumeConfig) {
      return;
    }

    form.reset({
      ...subvolumeConfig,
      snapshotIntervalSeconds: subvolumeConfig.snapshotIntervalSeconds || 3600,
      isEnabled: subvolumeConfig.isEnabled || false
    });
  }, [subvolumeConfig, form]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Stack>
        <form.Field name="snapshotIntervalSeconds">
          {(field) => (
            <NumberInput
              label={formatMessage(translations.snapshotIntervalLabel)}
              value={field.state.value}
              onChange={(value) => field.handleChange(Number(value))}
              onBlur={field.handleBlur}
              min={1}
            />
          )}
        </form.Field>
        <form.Field name="isEnabled">
          {(field) => (
            <Switch
              label={formatMessage(translations.enabledLabel)}
              checked={field.state.value}
              onChange={(e) => field.handleChange(e.currentTarget.checked)}
            />
          )}
        </form.Field>
        <Button type="submit" loading={isUpdatingSubvolumeConfig}>
          {formatMessage(translations.saveButton)}
        </Button>
      </Stack>
    </form>
  );
};
