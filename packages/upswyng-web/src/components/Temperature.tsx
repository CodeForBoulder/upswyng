import React from "react";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { Typography } from "@material-ui/core";
import { font } from "../App.styles";
import makeStyles from "@material-ui/styles/makeStyles";
import useTemperature from "./useTemperature";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    color: theme.palette.common.white,
  },
  temp: {
    alignItems: "flex-end",
    borderRight: `solid 2px ${theme.palette.common.white}`,
    display: "flex",
    flexDirection: "column",
    marginRight: "12px",
    padding: "5px 10px",
  },
  degrees: {
    fontSize: font.helpers.convertPixelsToRems(18),
    lineHeight: 1,
    fontWeight: 700,
    margin: 0,
    padding: 0,
  },
  location: {
    fontSize: font.helpers.convertPixelsToRems(12),
    margin: 0,
    padding: 0,
  },
}));

const Temperature = () => {
  const classes = useStyles();
  const temp: undefined | null | number = useTemperature();
  if (!temp) {
    return null;
  }

  return (
    <div className={classes.container}>
      <Typography variant="srOnly" component="h2">
        Current Temperature
      </Typography>
      <div className={classes.temp}>
        <span className={classes.degrees}>{temp}&deg;</span>
        <Typography variant="srOnly">in</Typography>
        <span className={classes.location}>Boulder, CO</span>
      </div>
    </div>
  );
};

export default Temperature;
