module.exports = {
  extends: ["./../../.eslintrc.js"],
  rules: {
    "@typescript-eslint/camelcase": [
      "error",
      {
        // enable snake casing properties for plural translations
        // https://www.i18next.com/translation-function/plurals
        properties: "never",
      },
    ],
  },
};
