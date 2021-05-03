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
            <Grid alignItems="center" container wrap="nowrap">
              <Grid item>
                <IconButton edge="start" onClick={() => setIsMenuOpen(true)}>
                  <Typography variant="srOnly">{t("menu")}</Typography>
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid alignItems="center" justify="flex-end" container item>
                <Grid item component={Temperature} />
                <Grid item>
                  <Link to="/">
                    <Box component={Logo} height={40} width="auto" />
                  </Link>
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
