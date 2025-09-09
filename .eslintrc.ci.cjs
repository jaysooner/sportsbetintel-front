// .eslintrc.ci.cjs
module.exports = {
  overrides: [
    {
      files: ["**/__tests__/**/*.{ts,tsx}", "**/*.test.{ts,tsx}"],
      rules: {
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      },
    },
    {
      files: ["src/components/ErrorBoundary.tsx"],
      rules: {
        "react/no-unescaped-entities": "off"
      }
    },
    {
      files: ["src/lib/external-links.ts", "src/lib/odds-api.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off"
      }
    }
  ]
}
