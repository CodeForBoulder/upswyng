import React from 'react';
import { Grid } from '@material-ui/core';
import {
  BananaIcon,
  BusIcon,
  BusinessCenterIcon,
  CallIcon,
  DoorIcon,
  HomeIcon,
  HygieneIcon,
  LocalHospitalIcon,
  PeopleIcon,
  SocksIcon,
  WifiIcon
} from './Icons';
import styled from 'styled-components';
import { THomeButtonAnchor, THomeButtonRouterLink } from '../types';
import { HomeRouterLink, HomeAnchorLink } from './HomeLink';
import HomeButton from './HomeButton';
import { colors } from '../App.styles';

const routerLinkButtons: THomeButtonRouterLink[] = [
  {
    text: 'Food',
    icon: BananaIcon,
    linkProps: {
      to: '/food'
    },
    color: colors.gold
  },
  {
    text: 'Shelter',
    icon: HomeIcon,
    linkProps: {
      to: '/shelters'
    },
    color: colors.orangeDark
  },
  {
    text: 'Hygiene',
    icon: HygieneIcon,
    linkProps: {
      to: '/hygiene'
    },
    color: colors.teal
  },
  {
    text: 'Transit',
    icon: BusIcon,
    linkProps: {
      to: '/transit'
    },
    color: colors.green
  },
  {
    text: 'Resources',
    icon: SocksIcon,
    linkProps: {
      to: '/resources'
    },
    color: colors.purple
  },
  {
    text: 'Hotlines',
    icon: CallIcon,
    linkProps: {
      to: '/hotlines'
    },
    color: colors.pink
  },
  {
    text: 'Health',
    icon: LocalHospitalIcon,
    linkProps: {
      to: '/health'
    },
    color: colors.red
  },
  {
    text: 'Wifi',
    icon: WifiIcon,
    linkProps: {
      to: '/wifi'
    },
    color: colors.blue
  },
  {
    text: 'Job Training',
    icon: BusinessCenterIcon,
    linkProps: {
      to: '/job-training'
    },
    color: colors.lavendar
  },
  {
    text: 'Social Services',
    icon: PeopleIcon,
    linkProps: {
      to: '/social-services'
    },
    color: colors.brown
  }
];

const coordinatedEntryButton: THomeButtonAnchor = {
  text: 'Coordinated Entry',
  href: 'https://www.bouldercounty.org/homeless/',
  icon: DoorIcon,
  color: colors.rosewood,
  target: '_blank',
  rel: 'noopener noreferrer'
};

const HomeButtonContainer = styled(Grid)`
  display: flex;
  alignitems: stretch;
` as typeof Grid;

const HomeButtons = () => (
  <>
    {routerLinkButtons.map(button => {
      return (
        <HomeButtonContainer item xs={6} key={button.text}>
          <HomeRouterLink {...button}>
            <HomeButton buttonColor={button.color}>
              {button.text}
              {button.icon}
            </HomeButton>
          </HomeRouterLink>
        </HomeButtonContainer>
      );
    })}{' '}
    <Grid item xs={12}>
      <HomeAnchorLink
        {...coordinatedEntryButton}
        key={coordinatedEntryButton.text}
      >
        <HomeButton buttonColor={coordinatedEntryButton.color}>
          {coordinatedEntryButton.text}
          {coordinatedEntryButton.icon}
        </HomeButton>
      </HomeAnchorLink>
    </Grid>
  </>
);

export default HomeButtons;
