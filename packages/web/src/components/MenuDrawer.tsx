import {
  CloseIcon,
  FavoriteIcon,
  InfoIcon,
  PolicyIcon,
  TermsOfServiceIcon,
} from "./Icons";

import Box from "@material-ui/core/Box";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Logo from "./Logo";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) => ({
  drawerPaper: {
    background: theme.palette.background.default,
  },
}));

interface MenuDrawerProps {
  handleMenuClose: Function;
  open: boolean;
}

const MenuDrawer = ({ handleMenuClose, open }: MenuDrawerProps) => {
  const { t } = useTranslation("mainMenu");
  const classes = useStyles();
  return (
    <Drawer
      onClose={() => handleMenuClose()}
      open={open}
      PaperProps={{ className: classes.drawerPaper }}
    >
      <Grid container direction="column">
        <Grid container item justify="flex-end">
          <IconButton onClick={() => handleMenuClose()}>
            <Typography variant="srOnly">{t("close")}</Typography>
            {CloseIcon}
          </IconButton>
        </Grid>
        <Grid item>
          <List disablePadding>
            <ListItem
              button
              component={RouterLink}
              onClick={() => handleMenuClose()}
              to="/"
            >
              <Typography variant="srOnly">{t("home")}</Typography>
              <Box maxWidth="100%" width={250}>
                <Logo />
              </Box>
            </ListItem>
            <ListItem
              button
              component={RouterLink}
              onClick={() => handleMenuClose()}
              to="/about"
            >
              <ListItemIcon>{InfoIcon}</ListItemIcon>
              <ListItemText>{t("about")}</ListItemText>
            </ListItem>
            <ListItem
              button
              component={RouterLink}
              onClick={() => handleMenuClose()}
              to="/terms-of-use"
            >
              <ListItemIcon>{TermsOfServiceIcon}</ListItemIcon>
              <ListItemText>{t("termsOfUse")}</ListItemText>
            </ListItem>
            <ListItem
              button
              component={RouterLink}
              onClick={() => handleMenuClose()}
              to="/privacy-policy"
            >
              <ListItemIcon>{PolicyIcon}</ListItemIcon>
              <ListItemText>{t("privacyPolicy")}</ListItemText>
            </ListItem>
            <ListItem
              button
              component={RouterLink}
              onClick={() => handleMenuClose()}
              to="/favorites"
            >
              <ListItemIcon>{FavoriteIcon}</ListItemIcon>
              <ListItemText>{t("favorites")}</ListItemText>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default MenuDrawer;
