import js from "@eslint/js";
import globals from "globals";
import stylistic from "@stylistic/eslint-plugin";
import unusedImports from "eslint-plugin-unused-imports";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    ignores: [
      "node_modules",
      "dist",
      "dist-electron",
      "packages/**/dist",
      "packages/**/node_modules",
    ],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
    },
    },
    plugins: {
      "stylistic": stylistic,
      "unused-imports": unusedImports,
      react,
      "react-hooks": reactHooks
    },
    rules: {
      "stylistic/indent": ["error", 2],
      "stylistic/semi": ["error", "always"],
      "stylistic/quotes": ["error", "double"],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        { ignoreRestSiblings: true }
      ],
      "no-unused-vars": [
        "error",
        { ignoreRestSiblings: true }
      ]
    },
  }
];
