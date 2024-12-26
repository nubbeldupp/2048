// @ts-check
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        // Game-specific global variables
        "document": "readonly",
        "window": "readonly",
        "localStorage": "readonly",
        "alert": "readonly"
      }
    },
    rules: {
      // Possible Errors
      "no-console": "warn",
      "no-unused-vars": "warn",
      
      // Best Practices
      "eqeqeq": "error",
      "no-eval": "error",
      "no-implied-eval": "error",
      
      // Style
      "indent": ["error", 2, { 
        "SwitchCase": 1,
        "VariableDeclarator": 1,
        "outerIIFEBody": 1,
        "MemberExpression": 1,
        "FunctionDeclaration": {"parameters": "first"},
        "FunctionExpression": {"parameters": "first"},
        "CallExpression": {"arguments": "first"},
        "ArrayExpression": "first",
        "ObjectExpression": "first"
      }],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "no-multiple-empty-lines": ["error", { "max": 2 }],
      
      // ES6
      "prefer-const": "error",
      "no-var": "error"
    }
  }
];
