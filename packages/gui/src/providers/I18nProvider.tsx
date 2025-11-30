import { type ReactNode } from "react";
import { IntlProvider } from "react-intl";

import en from "../../locales/en.json";
import sr from "../../locales/sr.json";

const messages = { en, sr };

export type Locale = keyof typeof messages;

export const I18nProvider = ({
  locale,
  children
}: {
  locale: Locale;
  children: ReactNode;
}) => {  
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
};
