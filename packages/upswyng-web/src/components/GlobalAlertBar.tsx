import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import AlertsDrawer from "./AlertsDrawer";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Container from "@material-ui/core/Container";
import { TStatusFetch } from "@upswyng/upswyng-types";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import makeStyles from "@material-ui/styles/makeStyles";
import useAlerts from "./useAlerts";

const useAlertStyles = makeStyles((theme: Theme) => ({
  root: {
    background: "none",
    color: theme.palette.common.white,
    padding: 0,
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
  const [viewingAlerts, setViewingAlerts] = useState(false);
  const alert = alerts?.length ? alerts[0] : null;

  const toggleDrawer = () => setViewingAlerts(b => !b);

  if (status !== TStatusFetch.STATUS_FETCH_SUCCESS || !alert) {
    return null;
  }

  return (
    <>
      <Box bgcolor={alert.color || "primary.main"} color="common.white">
        <Container>
          <Alert
            action={
              <Button
                endIcon={<ChevronRight />}
                onClick={toggleDrawer}
                size="small"
                variant="text"
              >
                See Alert
              </Button>
            }
            classes={alertClasses}
            icon={<span className={alert.icon} />}
          >
            {alert.title}
          </Alert>
        </Container>
      </Box>
      <AlertsDrawer
        alerts={alerts}
        anchor="top"
        open={viewingAlerts}
        onClose={toggleDrawer}
      />
    </>
  );
};

export default GlobalAlertBar;
