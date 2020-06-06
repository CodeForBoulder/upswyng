import Button, { ButtonProps } from "@material-ui/core/Button";
import React from "react";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { colors } from "@upswyng/common";
import { darken } from "polished";
import { font } from "../App.styles";
import makeStyles from "@material-ui/styles/makeStyles";

interface Props extends ButtonProps {
  buttonColor: string;
  isSelected: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  button: (props: Props) => ({
    background: props.isSelected ? props.buttonColor : "none",
    color: theme.palette.common.white,
    fontSize: font.helpers.convertPixelsToRems(16),
    textTransform: "none",
    "&:hover,&:focus": {
      background: props.isSelected
        ? darken(0.1, props.buttonColor)
        : darken(0.05, colors.charcoal),
    },
  }),
}));

const SubCategoryButton = (props: Props) => {
  const { children, buttonColor, isSelected, ...rest } = props;
  const classes = useStyles(props);

  return (
    <Button className={classes.button} {...rest}>
      {children}
    </Button>
  );
};

export default SubCategoryButton;
