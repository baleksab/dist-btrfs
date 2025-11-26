import js from "@eslint/js";
import globals from "globals";
import stylistic from "@stylistic/eslint-plugin";
import unusedImports from "eslint-plugin-unused-imports";
import tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,ts}"],
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
      globals: { ...globals.node, ...globals.es2021 },
    },
    plugins: {
      "stylistic": stylistic,
      "unused-imports": unusedImports
    },
    rules: {
      "stylistic/indent": ["error", 2],
      "stylistic/semi": ["error", "always"],
      "stylistic/quotes": ["error", "double"],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": ["error", {
        "ignoreRestSiblings": true,
      }],
      "no-unused-vars": ["error", {
        "ignoreRestSiblings": true,
      }],
    }
  },
];
