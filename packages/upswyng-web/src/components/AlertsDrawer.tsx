import Drawer, { DrawerProps } from "@material-ui/core/Drawer";
import AlertPanel from "./AlertPanel";
import Container from "@material-ui/core/Container";
import React from "react";
import { TAlertFull } from "@upswyng/upswyng-types";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";

interface Props extends DrawerProps {
  alerts: TAlertFull[] | null;
}

const useStyles = makeStyles((theme: Theme) => ({
  drawerPaper: {
    paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(5),
  },
}));

const AlertsDrawer = ({ alerts, ...drawerProps }: Props) => {
  const classes = useStyles();
  return (
    <Drawer
      anchor="top"
      {...drawerProps}
      open
      PaperProps={{ className: classes.drawerPaper }}
    >
      <Container>
        <Typography variant="h1" paragraph>
          Alerts
        </Typography>
        {alerts &&
          alerts.map(alert => <AlertPanel alert={alert} key={alert.title} />)}
      </Container>
    </Drawer>
  );
};

export default AlertsDrawer;
