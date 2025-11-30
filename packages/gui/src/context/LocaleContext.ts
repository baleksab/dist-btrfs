import { createContext } from "react";
import type { Locale } from "../providers";
import { noop } from "@mantine/core";

export const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (loc: Locale) => void;
}>({
  locale: "en",
  setLocale: noop,
});
