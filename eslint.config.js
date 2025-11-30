import js from "@eslint/js";
import globals from "globals";
import unusedImports from "eslint-plugin-unused-imports";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  js.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  reactHooks.configs.flat["recommended-latest"],
  prettierConfig,
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    settings: {
      react: {
        version: "detect"
      }
    },
    ignores: [
      "node_modules",
      "dist",
      "dist-electron",
      "packages/**/dist",
      "packages/**/node_modules",
      "packages/**/generated-types/**"
    ],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      "unused-imports": unusedImports,
      react,
      "react-hooks": reactHooks,
      prettier
    },
    rules: {
      "prettier/prettier": "error",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": ["error", { ignoreRestSiblings: true }],
      "no-unused-vars": "off",
      "react-hooks/exhaustive-deps": "off"
    }
  }
];
