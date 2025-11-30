import { writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const extractDefaultTranslations = (obj: any) => {
  const result: Record<string, string> = {};

  const recurse = (value: any) => {
    if (value && typeof value === "object" && "id" in value) {
      result[value.id] = value.defaultMessage;
      return;
    }

    if (value && typeof value === "object") {
      Object.values(value).forEach(recurse);
    }
  };

  recurse(obj);
  return result;
};

const ROOT = resolve("src");
const LOCALES_DIR = resolve("locales");
const OUTPUT = resolve("locales/en.json");

const findTranslationFiles = (dir: string): string[] => {
  const result: string[] = [];

  for (const file of readdirSync(dir)) {
    const fullPath = resolve(dir, file);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      result.push(...findTranslationFiles(fullPath));
    } else if (file === "translations.ts") {
      result.push(fullPath);
    }
  }

  return result;
};

const dynamicImport = async (file: string) => {
  const url = pathToFileURL(file).href;
  return import(url);
};

const ensureOutput = () => {
  if (!existsSync(LOCALES_DIR)) {
    mkdirSync(LOCALES_DIR, { recursive: true });
  }
};

(async () => {
  ensureOutput();

  const files = findTranslationFiles(ROOT);
  const merged: Record<string, string> = {};

  for (const file of files) {
    const mod = await dynamicImport(file);

    const rootObject = mod.default ?? mod.descriptors ?? Object.values(mod)[0];

    const extracted = extractDefaultTranslations(rootObject);
    Object.assign(merged, extracted);
  }

  writeFileSync(OUTPUT, JSON.stringify(merged, null, 2));
})();
