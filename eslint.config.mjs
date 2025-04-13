import { FlatCompat } from "@eslint/eslintrc";
import { pl } from "date-fns/locale";
const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});
const eslintConfig = [
  ...compat.config({
    extends: [
      "next",
      "eslint:recommended",
      "plugin:prettier/recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
    ],
    plugins: ["react", "@typescript-eslint", "prettier", "import", "tabs", "simple-import-sort"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    env: {
      browser: true,
      node: true,
      es2021: true,
    },
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",

      "react/prop-types": "off",
      "prettier/prettier": [
        "error",
        {
          singleQuote: false, // Ensure Prettier uses double quotes
        },
      ],
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "react/react-in-jsx-scope": "off", // React 17+ JSX import not required
      quotes: ["error", "double"], // Enforce double quotes in ESLint,
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Side effect imports (e.g. CSS)
            ["^\\u0000"],
            // Node.js builtins
            [`^node:`],
            // Packages (npm)
            ["^react", "^@?\\w"],
            // Internal aliases (like @/ or ~/)
            ["^@/"],
            // Parent imports
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Sibling imports
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Styles
            ["^.+\\.s?css$"],
          ],
        },
      ],
    },
    // settings: {
    //   next: {
    //     rootDir: "packages/my-app/",
    //   },
    // },
  }),
];
export default eslintConfig;
