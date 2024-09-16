/** @type {import("eslint").Linter.Config} */
const config = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "./tsconfig.json",
	},
	plugins: ["@typescript-eslint", "simple-import-sort", "jsdoc"],
	extends: [
		"next",
		"next/core-web-vitals",
		"airbnb",
		"airbnb-typescript",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/strict",
		"plugin:@typescript-eslint/recommended-type-checked",
		"plugin:@typescript-eslint/stylistic-type-checked",
		"plugin:react/jsx-runtime",
		"plugin:react-etc/recommended",
		"prettier",
		"prettier/prettier",
	],
	rules: {
		curly: ["error", "all"],

		/* Auto-sort imports and exports */
		"simple-import-sort/imports": "warn",
		"simple-import-sort/exports": "warn",
		"sort-imports": "off",
		"import/order": "off",

		"func-names": ["warn", "as-needed"],
		"import/no-default-export": "warn", // Default exports are confusing
		"import/prefer-default-export": "off",
		"react/jsx-props-no-spreading": "off", // TypeScript makes this safe
		"react/prop-types": "off", // TypeScript makes this safe
		"react/require-default-props": "off", // React `defaultProps` are deprecated

		"no-console": "off",
		"@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
	},
	overrides: [
		{
			files: ["src/{app,pages}/**", "*.config.*", "src/middleware.ts"],
			rules: {
				"import/no-default-export": "off",
				"import/prefer-default-export": "warn",
			},
		},
		{
			files: "src/{app,pages}/api/**",
			rules: {
				"import/prefer-default-export": "off",
			},
		},
		{
			files: ["app/api/**/*.ts"],
			plugins: ["jsdoc"],
			rules: {
				"jsdoc/no-missing-syntax": [
					"error",
					{
						contexts: [
							{
								comment: "JsdocBlock:has(JsdocTag[tag=swagger])",
								context: "any",
								message:
									"@swagger documentation is required on each API. Check this out for syntax info: https://github.com/jellydn/next-swagger-doc",
							},
						],
					},
				],
			},
		},
	],
};

module.exports = config;
