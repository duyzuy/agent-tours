module.exports = {
	root: true,
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended", // Integrates Prettier with ESLint
    'next', 'next/core-web-vitals',
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ["react", "@typescript-eslint", "prettier"],
	settings: {
		react: {
			version: "detect",
		},
	},
	env: {
		browser: true,
		node: true, // Ensure Node.js global variables are recognized
		es2021: true,
	},
	globals: {
		module: "readonly", // Define 'module' as a global variable
	},
	rules: {
		indent: ["error", "tab"],
		"react/prop-types": "off",
		"prettier/prettier": [
			"error",
			{
				singleQuote: false, // Ensure Prettier uses double quotes
			},
		],
		"@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
		"react/react-in-jsx-scope": "off", // React 17+ JSX import not required
		quotes: ["error", "double"], // Enforce double quotes in ESLint
	},
	ignorePatterns: [
		"node_modules/",
		"dist/",
		"coverage/",
		".eslintrc.js",
		'"*.config.*"',
	],
  overrides: [
    {
      files: ['*.config.js', '*.config.cjs', '*.config.mjs', 'scripts/**'],
      env: {
        node: true,
      },
    },
  ],
};
