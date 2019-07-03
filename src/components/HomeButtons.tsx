import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
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
import { colors, fonts } from '../App.styles';

const buttons: THomeButton[] = [
  {
    text: 'Food',
    icon: RestaurantIcon,
    to: '/food',
    color: colors.gold
  },
  {
    text: 'Shelter',
    icon: HomeIcon,
    to: '/shelter',
    color: colors.orangeDark
  },
  {
    text: 'Hygiene',
    icon: HotTubIcon,
    to: '/hygiene',
    color: colors.teal
  },
  {
    text: 'Transit',
    icon: BusIcon,
    to: '/transit',
    color: colors.green
  },
  {
    text: 'Resources',
    icon: GroceryStoreIcon,
    to: '/resources',
    color: colors.purple
  },
  {
    text: 'Hotlines',
    icon: CallIcon,
    to: '/hotlines',
    color: colors.pink
  },
  {
    text: 'Health',
    icon: HealingIcon,
    to: '/health',
    color: colors.red
  },
  {
    text: 'Wifi & Tech',
    icon: WifiIcon,
    to: '/wifi-and-tech',
    color: colors.blue
  },
  {
    text: 'Job Training',
    icon: WorkIcon,
    to: '/work',
    color: colors.lavendar
  },
  {
    text: 'Social Services',
    icon: InfoIcon,
    to: '/social-services',
    color: colors.brown
  }
];

const HomeLink = styled(Link)`
  text-decoration: none;
`;

interface HomeButtonProps extends ButtonProps {
  readonly buttonColor: string;
}

const HomeButton = styled((props: HomeButtonProps) => {
  return <Button {...props} />;
})`
  && {
    display: flex;
    align-items: stretch;
    width: 100%;
    padding: 10px;
    border-radius: 0;
    background: ${(props: HomeButtonProps) =>
      props.buttonColor || colors.greyDark};
    color: ${colors.white};
    text-decoration: none;
  }
  &&:hover {
    background: ${(props: HomeButtonProps) =>
      props.buttonColor || colors.greyDark};
    filter: brightness(95%);
  }
  > span {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    font-family: ${fonts.openSans};
    font-weight: 700;
    font-size: 22px;
    line-height: 24px;
    text-transform: none;
  }
  svg {
    width: 42px;
    height: auto;
    align-self: flex-end;
  }
`;

const HomeButtons = () => (
  <>
    {buttons.map((button: THomeButton) => {
      return (
        <Grid item xs={6} key={button.text}>
          <HomeLink to={button.to} data-test={button.text}>
            <HomeButton
              disableRipple={true}
              component={'span'}
              buttonColor={button.color}
            >
              {button.text}
              {button.icon}
            </HomeButton>
          </HomeLink>
        </Grid>
      );
    })}
  </>
);

export default HomeButtons;
