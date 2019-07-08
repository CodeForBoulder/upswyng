import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  CallIcon,
  BananaIcon,
  HomeIcon,
  HygieneIcon,
  BusIcon,
  BusinessCenterIcon,
  LocalHospitalIcon,
  PeopleIcon,
  SocksIcon,
  WifiIcon
} from './Icons';
import { THomeButton } from '../types';
import { colors, fonts } from '../App.styles';

const buttons: THomeButton[] = [
  {
    text: 'Food',
    icon: BananaIcon,
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
    icon: HygieneIcon,
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
    icon: SocksIcon,
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
    icon: LocalHospitalIcon,
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
    icon: BusinessCenterIcon,
    to: '/work',
    color: colors.lavendar
  },
  {
    text: 'Social Services',
    icon: PeopleIcon,
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
    align-items: stretch;
    background: ${(props: HomeButtonProps) =>
      props.buttonColor || colors.greyDark};
    border-radius: 0;
    color: ${colors.white};
    display: flex;
    padding: 10px;
    text-decoration: none;
    width: 100%;
  }
  &&:hover {
    background: ${(props: HomeButtonProps) =>
      props.buttonColor || colors.greyDark};
    filter: brightness(95%);
  }
  > span {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    font-family: ${fonts.openSans};
    font-size: 22px;
    font-weight: 700;
    justify-content: space-between;
    line-height: 24px;
    text-transform: none;
  }
  svg {
    align-self: flex-end;
    height: auto;
    width: 42px;
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
