import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Logo from './Logo';
import { Container } from '../App.styles';

const StyledHeader = styled(AppBar)`
  && {
    background: none;
    box-shadow: none;
  }
` as typeof AppBar;

const onMenuClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
  //handle when the menu button is clicked here
};

const Header = () => {
  return (
    <StyledHeader position="static">
      <Toolbar>
        <Container container justify="space-between" alignItems="center">
          <Grid item>
            <IconButton color="inherit" onClick={onMenuClick} aria-label="Menu">
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Link to="/">
              <Logo />
            </Link>
          </Grid>
        </Container>
      </Toolbar>
    </StyledHeader>
  );
};

export default Header;
