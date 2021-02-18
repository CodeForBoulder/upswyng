import en from "@upswyng/common/src/i18n/en.json";
import es from "@upswyng/common/src/i18n/es.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en,
      es,
    },
    debug: false, // change to true for development
    lng: "en",
    fallbackLng: "en",
    whitelist: ["en", "es"],
    keySeparator: ".",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
