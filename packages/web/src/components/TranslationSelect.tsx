import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import Select from "@material-ui/core/Select";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

const TranslationSelect = () => {
  const { t } = useTranslation("glossary");
  const [translationUsed, setTranslationUsed] = React.useState("en");

  const changeTranslation = (translation: string) => {
    i18n.changeLanguage(translation);
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const translationLanguage = event.target.value as string;
    setTranslationUsed(translationLanguage);
    changeTranslation(translationLanguage);
  };

  return (
    <Select
      value={translationUsed}
      onChange={handleChange}
      aria-label={t("selectLanguage")}
    >
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="es">Español</MenuItem>
    </Select>
  );
};

export default TranslationSelect;
