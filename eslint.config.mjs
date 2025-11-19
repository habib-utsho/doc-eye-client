import nextPlugin from "@next/eslint-plugin-next";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default tseslint.config(
  // Ignore patterns
  {
    ignores: [
      ".next/**",
      "dist/**",
      "node_modules/**",
      "out/**",
      ".eslintrc.cjs",
    ],
  },

  // Base JavaScript config
  js.configs.recommended,

  // TypeScript config
  ...tseslint.configs.recommended,

  // React + React Hooks
  {
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
    },
    settings: {
      react: { version: "detect" },
    },
  },

  // Next.js rules
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  // Custom rules
  {
    rules: {
      "react/prop-types": "off", // Not needed with TypeScript
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn", // Warn on 'any' usage
      "@typescript-eslint/no-empty-object-type": "off",

      // Downgrade errors to warnings for build
      "react/jsx-key": "warn",
      "react/no-unescaped-entities": "warn",
      "react-hooks/rules-of-hooks": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/static-components": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/preserve-manual-memoization": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
      "@typescript-eslint/no-extra-non-null-assertion": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
      "@typescript-eslint/no-wrapper-object-types": "warn",
      "no-useless-escape": "warn",
      "no-extra-boolean-cast": "warn",
      "prefer-const": "warn",
      "no-constant-binary-expression": "warn",
      "no-unsafe-optional-chaining": "warn",
      "react/no-unknown-property": "warn",
    },
  }
);
