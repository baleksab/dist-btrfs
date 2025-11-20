import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
  js.configs.recommended,
  prettier,
  {
    files: ["**/*.{js,ts}"],
    ignores: [
      "node_modules",
      "dist",
      "dist-electron",
      "packages/**/dist",
      "packages/**/node_modules",
    ],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node, ...globals.es2021 },
    }
  },
];
