import Backend from "i18next-xhr-backend";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend) // loads translation files from /web/public/locales
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: false, // change to true for development
    lng: "en",
    fallbackLng: "en",
    whitelist: ["en", "es"],

    keySeparator: ".",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

export default i18n;
