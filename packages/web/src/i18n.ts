import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        home: {
          food: "Food",
          shelter: "Shelter",
          hygiene: "Hygiene",
          transit: "Transit",
          resources: "Resources",
          hotlines: "Hotlines",
          health: "Health",
          wifi: "Wifi",
          jobTraining: "Job Training",
          socialServices: "Social Services",
          coordinatedEntry: "Coordinated Entry",
        },
      },
      es: {
        home: {
          food: "Comida",
          shelter: "Abrigo",
          hygiene: "Higiene",
          transit: "Tránsito",
          resources: "Recursos",
          hotlines: "Líneas Directas",
          health: "Salud",
          wifi: "Wifi",
          jobTraining: "Formación Profesional",
          socialServices: "Servicios Sociales",
          coordinatedEntry: "Entrada Coordinada",
        },
      },
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
