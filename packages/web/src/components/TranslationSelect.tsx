import { createStyles, makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import Select from "@material-ui/core/Select";
import { Theme } from "@material-ui/core/styles";

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

interface TranslationSelectProps {
  changeTranslation: (translation: string) => void;
}

const TranslationSelect = (Props: TranslationSelectProps) => {
  const classes = useStyles();
  const [translationUsed, setTranslationUsed] = React.useState("es");

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTranslationUsed(event.target.value as string);
    Props.changeTranslation(translationUsed);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select value={translationUsed} onChange={handleSelectChange}>
          <MenuItem value="es">English</MenuItem>
          <MenuItem value="en">Spanish</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default TranslationSelect;
