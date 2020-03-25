import Drawer, { DrawerProps } from "@material-ui/core/Drawer";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
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
      PaperProps={{ className: classes.drawerPaper }}
    >
      <Container>
        <Typography variant="h1" paragraph>
          Alerts
        </Typography>
        {alerts &&
          alerts.map(alert => (
            <ExpansionPanel key={alert.title}>
              <ExpansionPanelSummary>
                <Grid alignItems="center" container spacing={3} wrap="nowrap">
                  <Grid item>
                    <Avatar>
                      <span className={alert.icon} />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Typography component="h2" variant="h3">
                      {alert.title}
                    </Typography>
                  </Grid>
                </Grid>
              </ExpansionPanelSummary>
              {alert.detail && (
                <ExpansionPanelDetails>
                  <Typography>{alert.detail}</Typography>
                </ExpansionPanelDetails>
              )}
            </ExpansionPanel>
          ))}
      </Container>
    </Drawer>
  );
};

export default AlertsDrawer;
