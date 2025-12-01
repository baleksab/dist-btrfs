export const isFormComplete = (formState: { values: Record<string, any> }) =>
  Object.values(formState.values).every((v) => v !== undefined && v !== null && v !== "");
