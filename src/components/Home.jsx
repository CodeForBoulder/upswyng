import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import HomeIcon from '@material-ui/icons/Home';
import HotTubIcon from '@material-ui/icons/HotTub';
import BusIcon from '@material-ui/icons/DirectionsBus';
import GroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import HealingIcon from '@material-ui/icons/Healing';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PetsIcon from '@material-ui/icons/Pets';
import WifiIcon from '@material-ui/icons/Wifi';
import WorkIcon from '@material-ui/icons/Work';
import InfoIcon from '@material-ui/icons/Info';
import Search from './Search';

export const HomeButtonsMajor = [
  {
    text: 'Hotlines',
    icon: CallIcon,
    to: '/hotlines'
  },
  {
    text: 'Food',
    icon: RestaurantIcon,
    to: '/food'
  },
  {
    text: 'Shelter',
    icon: HomeIcon,
    to: '/shelter'
  },
  {
    text: 'Hygiene',
    icon: HotTubIcon,
    to: '/hygiene'
  },
  {
    text: 'Transit',
    icon: BusIcon,
    to: '/transit'
  },
  {
    text: 'Resources',
    icon: GroceryStoreIcon,
    to: '/resources'
  }
];

export const HomeButtonsMinor = [
  {
    text: 'Health',
    icon: HealingIcon,
    to: '/health'
  },
  {
    text: 'Education',
    icon: LibraryBooksIcon,
    to: '/education'
  },
  {
    text: 'Pets',
    icon: PetsIcon,
    to: '/pets'
  },
  {
    text: 'Wifi & Tech',
    icon: WifiIcon,
    to: '/wifi-and-tech'
  },
  {
    text: 'Work',
    icon: WorkIcon,
    to: '/work'
  },
  {
    text: 'Social Services',
    icon: InfoIcon,
    to: '/social-services'
  }
];

export const HomeComponent = () => (
  <Grid container className="home" spacing={16} justify="space-evenly">
    <Grid item xs={12}>
      <Grid container className="home" spacing={16} justify="space-evenly">
        <Grid component={Search} item xs={12} />
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container spacing={16} justify="space-evenly">
        {HomeButtonsMajor.map((button, index) => {
          return (
            <Grid item xs={4} key={button.text}>
              <Grid container direction="column" align="center">
                <Button component={Link} to={button.to} color="primary">
                  <button.icon />
                  {button.text}
                </Button>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container spacing={16} justify="space-evenly">
        {HomeButtonsMinor.map(button => {
          return (
            <Grid item xs={4} key={button.text}>
              <Grid container direction="column" align="center">
                <Button component={Link} to={button.to} color="secondary">
                  <button.icon />
                  {button.text}
                </Button>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  </Grid>
);

const Home = () => <HomeComponent />;

export default Home;
