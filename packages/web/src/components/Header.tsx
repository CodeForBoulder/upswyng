import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import MenuDrawer from "./MenuDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import Temperature from "./Temperature";
import Toolbar from "@material-ui/core/Toolbar";
import TranslationSelect from "./TranslationSelect";
import Typography from "@material-ui/core/Typography";

import { useTranslation } from "react-i18next";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { t } = useTranslation("glossary");

  return (
    <Box my={2}>
      <AppBar color="transparent" elevation={0} position="static">
        <Toolbar disableGutters>
          <Container>
            <Grid
              alignItems="center"
              container
              justify="space-between"
              wrap="nowrap"
            >
              <Grid alignItems="center" container item wrap="nowrap" xs={5}>
                <Grid item>
                  <IconButton edge="start" onClick={() => setIsMenuOpen(true)}>
                    <Typography variant="srOnly">{t("menu")}</Typography>
                    <MenuIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Link to="/">
                    <Box component={Logo} height={40} maxWidth="100%" />
                  </Link>
                </Grid>
              </Grid>
              <Grid
                alignItems="center"
                container
                item
                justify="flex-end"
                wrap="nowrap"
                xs={7}
              >
                <Grid item component={Temperature} />
                <Grid item>
                  <TranslationSelect />
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
        <MenuDrawer
          open={isMenuOpen}
          handleMenuClose={() => setIsMenuOpen(false)}
        />
      </AppBar>
    </Box>
  );
};

export default Header;
