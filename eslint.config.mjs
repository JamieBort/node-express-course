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
	},
	{ files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
]);
