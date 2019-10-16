import React from 'react';

import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Link, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';

import Logo from './Logo';
import { CloseIcon, InfoIcon, PolicyIcon, TermsOfServiceIcon } from './Icons';
import { colors, font } from '../App.styles';

const StyledDrawer = styled(Drawer)`
  && {
    .MuiPaper-root {
      background: ${colors.charcoal};
      font-size: ${font.helpers.convertPixelsToRems(24)};
      max-width: 100%;
      position: relative;
      width: ${font.helpers.convertPixelsToRems(400)};
    }
  }
` as typeof Drawer;

const StyledDrawerHeader = styled.div`
  display: block;
  margin-bottom: ${font.helpers.convertPixelsToRems(15)};
  position: relative;
`;

const StyledCloseButton = styled(IconButton)`
  && {
    color: ${colors.white};
    position: absolute;
    right: 0;
    top: 0;
    z-index: 10;
  }
` as typeof IconButton;

const StyledMenuLink = styled((props: NavLinkProps) => {
  const { children, ...rest } = props;
  return <Link {...rest}>{children}</Link>;
})`
  && {
    display: flex;
    align-items: center;
    &:link,
    &:visited {
      text-decoration: none;
    }
    &:hover,
    &:active {
      text-decoration: underline;
    }
  }
`;

const StyledListIcon = styled(ListItemIcon)`
  && {
    color: ${colors.white};
  }
` as typeof ListItemIcon;

const StyledLogo = styled(Logo)`
  && {
    max-width: 100%;
    width: ${font.helpers.convertPixelsToRems(250)};
  }
` as typeof Logo;

interface MenuDrawerProps {
  handleMenuClose: Function;
  open: boolean;
}

const MenuDrawer = ({ handleMenuClose, open }: MenuDrawerProps) => (
  <StyledDrawer onClose={() => handleMenuClose()} open={open}>
    <StyledDrawerHeader>
      <StyledCloseButton
        aria-label="close menu"
        onClick={() => handleMenuClose()}
      >
        {CloseIcon}
      </StyledCloseButton>
    </StyledDrawerHeader>
    <List>
      <ListItem>
        <StyledMenuLink
          aria-label="home"
          onClick={() => handleMenuClose()}
          to="/"
        >
          <StyledLogo />
        </StyledMenuLink>
      </ListItem>
      <ListItem>
        <StyledMenuLink onClick={() => handleMenuClose()} to="/about">
          <StyledListIcon>{InfoIcon}</StyledListIcon>
          About
        </StyledMenuLink>
      </ListItem>
      <ListItem>
        <StyledMenuLink onClick={() => handleMenuClose()} to="/terms-of-use">
          <StyledListIcon>{TermsOfServiceIcon}</StyledListIcon>
          Terms of Use
        </StyledMenuLink>
      </ListItem>
      <ListItem>
        <StyledMenuLink onClick={() => handleMenuClose()} to="/privacy-policy">
          <StyledListIcon>{PolicyIcon}</StyledListIcon>
          Privacy policy
        </StyledMenuLink>
      </ListItem>
    </List>
  </StyledDrawer>
);

export default MenuDrawer;
