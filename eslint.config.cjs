const eslintPluginReact = require("eslint-plugin-react");
const eslintPluginTypeScript = require("@typescript-eslint/eslint-plugin");
const eslintPluginReactHooks = require("eslint-plugin-react-hooks");
const tsParser = require("@typescript-eslint/parser");

/** @type {import("eslint").Linter.Config} */
module.exports = [
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        document: "readonly",
        window: "readonly",
      },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      "@typescript-eslint": eslintPluginTypeScript,
    },
    rules: {
      
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",  
      "no-unused-vars": "off",  

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_", 
          varsIgnorePattern: "^_", 
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
