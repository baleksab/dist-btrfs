import { useMutation } from "@tanstack/react-query";
import { validateConnection } from "../apis";

export const useValidateConnection = () => {
  const {
    mutateAsync: validateConnectionAsync,
    data: validationResult,
    isPending: isValidatingConnection,
    isError: validationError
  } = useMutation({
    mutationFn: validateConnection
  });

  return {
    validateConnectionAsync,
    validationResult,
    isValidatingConnection,
    validationError
  };
};
