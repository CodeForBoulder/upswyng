import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import React from "react";
import { TStatusFetch } from "@upswyng/upswyng-types";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import makeStyles from "@material-ui/styles/makeStyles";
import useAlerts from "./useAlerts";

const useAlertStyles = makeStyles((theme: Theme) => ({
  root: {
    background: "none",
    color: theme.palette.common.white,
  },
  icon: {
    "&&": {
      color: theme.palette.common.white,
    },
  },
}));

const GlobalAlertBar = () => {
  const [status, alerts] = useAlerts();
  const alertClasses = useAlertStyles();
  const alert = alerts?.length ? alerts[0] : null;

  if (status !== TStatusFetch.STATUS_FETCH_SUCCESS || !alert) {
    return null;
  }

  return (
    <Box bgcolor={alert.color || "primary.main"} color="common.white">
      <Container>
        <Alert classes={alertClasses} icon={<span className={alert.icon} />}>
          {alert.title}
        </Alert>
      </Container>
    </Box>
  );
};

export default GlobalAlertBar;
