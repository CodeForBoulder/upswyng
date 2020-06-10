import { ButtonProps } from "@material-ui/core/Button";
import React from "react";
import { colors } from "@upswyng/common";
import { font } from "../App.styles";
import makeStyles from "@material-ui/core/styles/makeStyles";

interface HomeButtonProps extends ButtonProps {
  buttonColor: string;
  children: React.ReactNode | React.ReactNode[];
}

const useStyles = makeStyles({
  button: (props: HomeButtonProps) => ({
    alignItems: "stretch",
    background: props.buttonColor || colors.greyDark,
    borderRadius: 0,
    color: colors.white,
    display: "flex",
    flexDirection: "column",
    fontFamily: font.families.openSans,
    fontSize: font.helpers.convertPixelsToRems(22),
    fontWeight: 700,
    justifyContent: "space-between",
    lineHeight: font.helpers.convertPixelsToRems(24),
    padding: font.helpers.convertPixelsToRems(10),
    textDecoration: "none",
    textTransform: "none",
    width: "100%",
    "&:hover": {
      background: props.buttonColor || colors.greyDark,
      filter: "brightness(95%)",
    },
    "& svg": {
      alignSelf: "flex-end",
      height: "auto",
      maxHeight: font.helpers.convertPixelsToRems(45),
      width: font.helpers.convertPixelsToRems(42),
    },
  }),
});

const HomeButton = (props: HomeButtonProps) => {
  const buttonClasses = useStyles(props);
  return <span className={buttonClasses.button}>{props.children}</span>;
};

export default HomeButton;
