// eslint.config.js

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// These lines are necessary for FlatCompat to locate the extends paths correctly.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// FlatCompat is a utility to help use older-style configs in the new flat config.
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // This part correctly spreads the configurations from Next.js
  ...compat.extends("next/core-web-vitals"),

  // --- THIS IS THE FIX ---
  // The 'rules' object must be its own element in the array, wrapped in curly braces {}.
  {
    rules: {
      // You only need one of these, the prefixed version is correct.
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
    }
  }
];

export default eslintConfig;