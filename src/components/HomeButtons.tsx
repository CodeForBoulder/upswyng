import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  CallIcon,
  RestaurantIcon,
  HomeIcon,
  HotTubIcon,
  BusIcon,
  GroceryStoreIcon,
  HealingIcon,
  WifiIcon,
  WorkIcon,
  InfoIcon
} from './Icons';
import { THomeButton } from '../types';

const buttons: THomeButton[] = [
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
  },
  {
    text: 'Hotlines',
    icon: CallIcon,
    to: '/hotlines'
  },
  {
    text: 'Health',
    icon: HealingIcon,
    to: '/health'
  },
  {
    text: 'Wifi & Tech',
    icon: WifiIcon,
    to: '/wifi-and-tech'
  },
  {
    text: 'Job Training',
    icon: WorkIcon,
    to: '/work'
  },
  {
    text: 'Social Services',
    icon: InfoIcon,
    to: '/social-services'
  }
];

const HomeButtons = () => (
  <>
    {buttons.map((button: THomeButton) => {
      return (
        <Grid item xs={6} key={button.text}>
          <Grid container direction="column" alignItems="center">
            <Link to={button.to} data-test={button.text}>
              <Button component={'span'}>
                {button.icon}
                {button.text}
              </Button>
            </Link>
          </Grid>
        </Grid>
      );
    })}
  </>
);

export default HomeButtons;
