import { type ReactNode } from "react";
import { IntlProvider } from "react-intl";

import en from "../../locales/en.json";
import sr from "../../locales/sr.json";
import zh from "../../locales/zh.json";
import ru from "../../locales/ru.json";

const messages = { en, sr, zh, ru };

export type Locale = keyof typeof messages;

export const I18nProvider = ({ locale, children }: { locale: Locale; children: ReactNode }) => {
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
};
