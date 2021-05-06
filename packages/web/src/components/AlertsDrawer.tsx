import Drawer, { DrawerProps } from "@material-ui/core/Drawer";

import AlertPanel from "./AlertPanel";
import CloseIcon from "@material-ui/icons/Close";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import { TAlert } from "@upswyng/types";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import { useTranslation } from "react-i18next";

interface Props extends DrawerProps {
  alerts: TAlert[] | null;
  toggleDrawer: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  drawerPaper: {
    backgroundColor: theme.palette.grey[900],
    paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(5),
  },
}));

const AlertsDrawer = ({ alerts, toggleDrawer, ...drawerProps }: Props) => {
  const classes = useStyles();
  const { t } = useTranslation("alerts");

  return (
    <Drawer
      anchor="top"
      {...drawerProps}
      PaperProps={{ className: classes.drawerPaper }}
    >
      <Container>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Typography variant="h1">{t("closeAlerts")}</Typography>
          </Grid>
          {alerts && (
            <Grid item>
              {alerts.map((alert, i) => (
                <AlertPanel
                  alert={alert}
                  defaultExpanded={i === 0}
                  key={alert.title}
                />
              ))}
            </Grid>
          )}
          <Grid container justify="flex-end" item>
            <IconButton onClick={toggleDrawer}>
              <Typography variant="srOnly">close alerts</Typography>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </Drawer>
  );
};

export default AlertsDrawer;
