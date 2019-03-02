import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const onMenuClick = e => {
  //handle when the menu button is clicked here
};

function Header(props) {
  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={onMenuClick} aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <img src="https://via.placeholder.com/150x50" alt="UpSwyng" />
          </Link>
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;
