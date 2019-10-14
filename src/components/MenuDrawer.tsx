import React from 'react';

import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const MenuDrawer = (props: DrawerProps) => (
  <Drawer {...props}>
    <List>
      <ListItem>Item 1</ListItem>
      <ListItem>Item 2</ListItem>
    </List>
  </Drawer>
);

export default MenuDrawer;
