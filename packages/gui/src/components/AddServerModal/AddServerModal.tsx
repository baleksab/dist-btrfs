import { Modal, TextInput, NumberInput, Switch, Button } from "@mantine/core";
import { useForm } from "@tanstack/react-form";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import styles from "./AddServerModal.module.scss";
import type { CreateNewServerRequest } from "../../generated-types";
import { useCreateRemoteServer } from "../../hooks";

export const AddServerModal = ({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) => {
  const { formatMessage } = useIntl();
  const { mutateAsync, isPending } = useCreateRemoteServer();

  const form = useForm({
    defaultValues: {
      port: 22,
      isPrimary: false,
    } as CreateNewServerRequest,
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
      onClose();
    },
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      title={formatMessage(translations.title)}
    >
      <form
        className={styles.wrapper}
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className={styles.column}>
          <form.Field name="name">
            {(field) => (
              <TextInput
                label={formatMessage(translations.name)}
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
                className={styles.input}
              />
            )}
          </form.Field>
          <form.Field name="ipAddress">
            {(field) => (
              <TextInput
                required
                label={formatMessage(translations.ipAddress)}
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
                className={styles.input}
              />
            )}
          </form.Field>
          <form.Field name="port">
            {(field) => (
              <NumberInput
                label={formatMessage(translations.port)}
                value={field.state.value}
                onChange={(v) => field.handleChange(Number(v))}
                className={styles.input}
              />
            )}
          </form.Field>
          <form.Field name="username">
            {(field) => (
              <TextInput
                required
                label={formatMessage(translations.username)}
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
                className={styles.input}
              />
            )}
          </form.Field>
          <form.Field name="password">
            {(field) => (
              <TextInput
                type="password"
                label={formatMessage(translations.password)}
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
                className={styles.input}
              />
            )}
          </form.Field>
          <form.Field name="isPrimary">
            {(field) => (
              <Switch
                label={formatMessage(translations.isPrimary)}
                checked={field.state.value ?? false}
                onChange={(e) => field.handleChange(e.target.checked)}
                className={styles.switch}
              />
            )}
          </form.Field>
        </div>

        <div className={styles.actions}>
          <Button variant="default" onClick={onClose}>
            {formatMessage(translations.cancel)}
          </Button>
          <Button type="submit" loading={isPending}>{formatMessage(translations.submit)}</Button>
        </div>
      </form>
    </Modal>
  );
};
