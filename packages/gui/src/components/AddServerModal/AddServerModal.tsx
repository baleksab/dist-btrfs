import {
  Modal,
  TextInput,
  NumberInput,
  Button,
  Group,
  Stack,
  Switch,
  Tooltip,
  ThemeIcon
} from "@mantine/core";
import { useForm, useStore } from "@tanstack/react-form";
import { useIntl } from "react-intl";
import { translations } from "./translations";
import styles from "./AddServerModal.module.scss";
import type {
  CreateNewServerRequest,
  GetAllServersResponse,
  UpdateServerRequest
} from "../../generated-types";
import { useCreateRemoteServer, useUpdateRemoteServer, useValidateConnection } from "../../hooks";
import { isFormComplete } from "../../utils";
import { IconCheck, IconX } from "@tabler/icons-react";

type AddServerModalProps = {
  opened: boolean;
  onClose: () => void;
  server?: GetAllServersResponse;
};

export const AddServerModal = ({ opened, onClose, server }: AddServerModalProps) => {
  const { formatMessage } = useIntl();

  const { mutateAsync: createServerAsync, isPending: isCreatingServer } = useCreateRemoteServer();
  const { mutateAsync: updateServerAsync, isPending: isUpdatingServer } = useUpdateRemoteServer();

  const { validateConnectionAsync, validationResult, isValidatingConnection, validationError } =
    useValidateConnection();

  const isPending = isCreatingServer || isUpdatingServer;

  const form = useForm({
    defaultValues: {
      ...(server ? server : { port: 22, isPrimary: false, ipAddress: "localhost" })
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

  const formState = useStore(form.store);

  const disableVerifyButton =
    !formState.values.ipAddress ||
    !formState.values.port ||
    !formState.values.username ||
    !formState.values.password;

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
        <Stack>
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
          <Group justify="space-between">
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
            {validationResult?.online === true && (
              <ThemeIcon color="green" variant="light" radius="xl" size="lg">
                <IconCheck size={18} />
              </ThemeIcon>
            )}
            {(validationResult?.online === false || validationError) && (
              <ThemeIcon color="red" variant="light" radius="xl" size="lg">
                <IconX size={18} />
              </ThemeIcon>
            )}
          </Group>
        </Stack>

        <Group justify="space-between" mt={12}>
          <Tooltip
            label={formatMessage(translations.verifyTooltip)}
            color="gray"
            position="top"
            disabled={!disableVerifyButton}
          >
            <Button
              variant="light"
              onClick={() =>
                validateConnectionAsync({
                  ipAddress: form.getFieldValue("ipAddress") || "",
                  port: form.getFieldValue("port"),
                  username: form.getFieldValue("username") || "",
                  password: form.getFieldValue("password") || ""
                })
              }
              loading={isValidatingConnection}
              disabled={isPending || disableVerifyButton}
            >
              {formatMessage(translations.verifyConnection)}
            </Button>
          </Tooltip>
          <Group justify="space-between">
            <Button variant="default" onClick={onClose}>
              {formatMessage(translations.cancel)}
            </Button>
            <Button
              type="submit"
              loading={isPending}
              disabled={isPending || isValidatingConnection || !isFormComplete(formState)}
            >
              {server
                ? formatMessage(translations.submitUpdate)
                : formatMessage(translations.submitAdd)}
            </Button>
          </Group>
        </Group>
      </form>
    </Modal>
  );
};
