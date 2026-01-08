import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		// ADDED: report unused eslint-disable comments
		linterOptions: {
			reportUnusedDisableDirectives: "error",
		},
		files: ["**/*.{js,mjs,cjs}"],
		plugins: { js },
		extends: ["js/recommended"],
		languageOptions: { globals: globals.node },
		rules: {
			"no-console": "error", // catch console.log
			"no-unused-vars": "error", // catch unused variables
			// "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }] // ignore unused function args starting with _
		},
	},
	{ files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
]);
