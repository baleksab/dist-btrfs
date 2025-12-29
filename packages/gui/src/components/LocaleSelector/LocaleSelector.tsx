import { Select } from "@mantine/core";
import type { Locale } from "../../providers";
import { LocaleContext } from "../../context";
import { use } from "react";

const availableLocales: { value: Locale; label: string }[] = [
  { value: "en", label: "English" },
  { value: "sr", label: "Srpski" },
  { value: "zh", label: "简体中文" },
  { value: "ru", label: "Русский" }
];

export const LocaleSelector = () => {
  const { locale, setLocale } = use(LocaleContext);

  const handleChange = (newLocale: string | null) => {
    if (!newLocale) {
      return;
    }

    setLocale(newLocale as Locale);
    localStorage.setItem("locale", newLocale);
  };

  return (
    <Select size="sm" radius="md" value={locale} onChange={handleChange} data={availableLocales} />
  );
};
