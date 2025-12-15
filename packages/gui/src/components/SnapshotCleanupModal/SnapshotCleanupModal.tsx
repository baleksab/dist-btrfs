import { Modal, NumberInput, Button, Group, Radio, Stack } from "@mantine/core";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import { useForm } from "@tanstack/react-form";
import { useSnapshotsCleanup } from "../../hooks";
import type { BtrfsSnapshotCleanupRequest } from "../../generated-types";

type SnapshotCleanupModalProps = {
  opened: boolean;
  onClose: () => void;
  subvolume: string;
};

export const SnapshotCleanupModal = ({ opened, subvolume, onClose }: SnapshotCleanupModalProps) => {
  const { formatMessage } = useIntl();

  const { cleanupSnapshotsAsync, isCleaningupSnapshots } = useSnapshotsCleanup(subvolume);

  const form = useForm({
    defaultValues: {
      type: "daily",
      keep: 7
    } as BtrfsSnapshotCleanupRequest,
    onSubmit: async ({ value }) => {
      await cleanupSnapshotsAsync(value);
      onClose();
    }
  });

  return (
    <Modal opened={opened} onClose={onClose} centered title={formatMessage(translations.title)}>
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
        <Group justify="flex-end" mt="lg">
          <Button variant="default" onClick={onClose} disabled={isCleaningupSnapshots}>
            {formatMessage(translations.cancel)}
          </Button>
          <Button type="submit" loading={isCleaningupSnapshots}>
            {formatMessage(translations.apply)}
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
