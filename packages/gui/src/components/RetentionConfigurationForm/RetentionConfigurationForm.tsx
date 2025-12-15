import { useForm } from "@tanstack/react-form";
import {
  BtrfsSubvolumeSetRetentionConfigRequestTypeEnum,
  type BtrfsSubvolumeSetRetentionConfigRequest
} from "../../generated-types";
import { NumberInput, Radio, Stack } from "@mantine/core";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { useSubvolumeRetentionConfig } from "../../hooks";
import { useEffect } from "react";

type RetentionConfigurationFormProps = {
  subvolume?: string;
};

export const RetentionConfigurationForm = ({ subvolume }: RetentionConfigurationFormProps) => {
  const { formatMessage } = useIntl();

  const { subvolumeRetentionConfig } = useSubvolumeRetentionConfig(subvolume || "");

  const form = useForm({
    defaultValues: {
      retentionIntervalSeconds: 3600,
      isEnabled: false,
      type: BtrfsSubvolumeSetRetentionConfigRequestTypeEnum.Weekly
    } as BtrfsSubvolumeSetRetentionConfigRequest
  });

  useEffect(() => {
    if (!subvolumeRetentionConfig) {
      return;
    }

    form.reset({
      ...subvolumeRetentionConfig,
      retentionIntervalSeconds: subvolumeRetentionConfig.retentionIntervalSeconds || 3600,
      isEnabled: Boolean(subvolumeRetentionConfig.isEnabled) || false
    });
  }, [subvolumeRetentionConfig, form]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field name="type">
        {(field) => (
          <Radio.Group
            label={formatMessage(translations.type)}
            value={field.state.value}
            onChange={(val) => field.handleChange(val as "daily" | "weekly" | "monthly")}
            mb="lg"
          >
            <Stack gap="xs">
              <Radio value="daily" label={formatMessage(translations.daily)} />
              <Radio value="weekly" label={formatMessage(translations.weekly)} />
              <Radio value="monthly" label={formatMessage(translations.monthly)} />
            </Stack>
          </Radio.Group>
        )}
      </form.Field>
      <form.Field name="keep">
        {(field) => (
          <NumberInput
            label={formatMessage(translations.keep)}
            min={1}
            value={field.state.value}
            onChange={(val) => field.handleChange(val ? Number(val) : 1)}
            mb="md"
          />
        )}
      </form.Field>
    </form>
  );
};
