import ExpansionPanel, {
  ExpansionPanelProps,
} from "@material-ui/core/ExpansionPanel";
import Avatar from "@material-ui/core/Avatar";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Grid from "@material-ui/core/Grid";
import MuiMarkdown from "./MuiMarkdown";
import React from "react";
import { TAlertFull } from "@upswyng/upswyng-types";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";

const useStyles = makeStyles((theme: Theme) => ({
  avatar: (alert: TAlertFull) => ({
    backgroundColor: alert.color || theme.palette.primary.main,
    color: theme.palette.common.white,
  }),
  expansionPanel: (alert: TAlertFull) => ({
    "&::before": {
      backgroundColor: alert.color || theme.palette.primary.main,
    },
  }),
  expansionPanelDetails: {
    display: "block",
  },
}));

interface Props extends ExpansionPanelProps {
  alert: TAlertFull;
}

const AlertPanel = ({ alert, ...rest }: Props) => {
  const classes = useStyles(alert);
  return (
    <ExpansionPanel className={classes.expansionPanel} {...rest}>
      <ExpansionPanelSummary expandIcon={alert.detail ? <ExpandMore /> : null}>
        <Grid alignItems="center" container spacing={3} wrap="nowrap">
          <Grid item>
            <Avatar className={classes.avatar}>
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
        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
          <MuiMarkdown markdown={alert.detail} />
        </ExpansionPanelDetails>
      )}
    </ExpansionPanel>
  );
};

export default AlertPanel;
