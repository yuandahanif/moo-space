/** @type {import("eslint").Linter.Config} */
const config = {
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: ["tsconfig.json", "tsconfig.node.json"],
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "standard-with-typescript",
    "plugin:prettier/recommended",
  ],
  rules: {
    eqeqeq: ["error", "smart"],
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        format: ["snake_case", "camelCase", "UPPER_CASE", "PascalCase"],
        selector: ["function", "variable"],
        leadingUnderscore: "allow",
      },
    ],
    "@next/next/no-img-element": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
  },
};

module.exports = config;
