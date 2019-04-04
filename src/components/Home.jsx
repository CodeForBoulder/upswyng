import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import {
  CallIcon,
  RestaurantIcon,
  HomeIcon,
  HotTubIcon,
  BusIcon,
  GroceryStoreIcon,
  HealingIcon,
  LibraryBooksIcon,
  PetsIcon,
  WifiIcon,
  WorkIcon,
  InfoIcon
} from './Icons';
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
                <Button
                  component={Link}
                  to={button.to}
                  className="button button--home"
                  data-test={button.text}
                >
                  {button.icon}
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
                <Button
                  component={Link}
                  to={button.to}
                  className="button button--home button--home-minor"
                  data-test={button.text}
                >
                  {button.icon}
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
