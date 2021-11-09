import { createStyles, makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import Select from "@material-ui/core/Select";
import { Theme } from "@material-ui/core/styles";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const TranslationSelect = () => {
  const { t } = useTranslation("glossary");
  const classes = useStyles();
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
    <div>
      <FormControl className={classes.formControl}>
        <Select
          value={translationUsed}
          onChange={handleChange}
          aria-label={t("selectLanguage")}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="es">Español</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default TranslationSelect;
