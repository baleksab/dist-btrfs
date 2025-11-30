import { Modal, TextInput, NumberInput, Switch, Button } from "@mantine/core";
import { useForm } from "@tanstack/react-form";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import styles from "./AddServerModal.module.scss";
import type {
  CreateNewServerRequest,
  GetAllServersResponse,
  UpdateServerRequest
} from "../../generated-types";
import { useCreateRemoteServer } from "../../hooks";
import { useUpdateRemoteServer } from "../../hooks/useUpdateRemoteServer";
import { useEffect } from "react";

type AddServerModalProps = {
  opened: boolean;
  onClose: () => void;
  server?: GetAllServersResponse;
};

export const AddServerModal = ({ opened, onClose, server }: AddServerModalProps) => {
  const { formatMessage } = useIntl();

  const { mutateAsync: createServerAsync, isPending: isCreatingServer } = useCreateRemoteServer();
  const { mutateAsync: updateServerAsync, isPending: isUpdatingServer } = useUpdateRemoteServer();

  const isPending = isCreatingServer || isUpdatingServer;

  const form = useForm({
    defaultValues: {
      port: 22,
      isPrimary: false
    } as CreateNewServerRequest | UpdateServerRequest,
    onSubmit: async ({ value }) => {
      if (server) {
        updateServerAsync({
          uid: server.uid,
          request: { ...value, isPrimary: Boolean(value.isPrimary) } as UpdateServerRequest
        });
      } else {
        await createServerAsync(value as CreateNewServerRequest);
      }
      onClose();
    }
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    form.reset({
      ...(server ? server : { port: 22, isPrimary: false })
    });
  }, [server, open]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      title={
        server ? formatMessage(translations.updateTitle) : formatMessage(translations.addTitle)
      }
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
                required={!server}
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
                required={!server}
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
                disabled={server?.isPrimary}
              />
            )}
          </form.Field>
        </div>

        <div className={styles.actions}>
          <Button variant="default" onClick={onClose}>
            {formatMessage(translations.cancel)}
          </Button>
          <Button type="submit" loading={isPending}>
            {server
              ? formatMessage(translations.submitUpdate)
              : formatMessage(translations.submitAdd)}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
