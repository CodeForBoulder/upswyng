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

const headerVerticalMargin = 24;

const StyledHeader = styled(AppBar)`
  && {
    background: none;
    box-shadow: none;
    margin-bottom: ${headerVerticalMargin / 2}px;
    margin-top: ${headerVerticalMargin}px;
  }
` as typeof AppBar;

const StyledMenuButton = styled(IconButton)`
  && {
    margin-left: -12px;
  }
` as typeof IconButton;

const StyledLogo = styled(Logo)`
  && {
    height: 40px;
    width: auto;
  }
` as typeof Logo;

const Header = () => {
  return (
    <StyledHeader position="static">
      <Toolbar>
        <Container container justify="space-between" alignItems="center">
          <Grid item>
            <StyledMenuButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </StyledMenuButton>
          </Grid>
          <Grid item>
            <Link to="/">
              <StyledLogo />
            </Link>
          </Grid>
        </Container>
      </Toolbar>
    </StyledHeader>
  );
};

export default Header;
