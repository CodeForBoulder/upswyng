import React from 'react';
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
  target: '_blank'
};

const HomeButtons = () => (
  <>
    {routerLinkButtons.map(button => {
      return (
        <HomeRouterLink {...button} key={button.text}>
          <HomeButton component={'span'} buttonColor={button.color}>
            {button.text}
            {button.icon}
          </HomeButton>
        </HomeRouterLink>
      );
    })}
    <HomeAnchorLink
      {...coordinatedEntryButton}
      key={coordinatedEntryButton.text}
    >
      <HomeButton component={'span'} buttonColor={coordinatedEntryButton.color}>
        {coordinatedEntryButton.text}
        {coordinatedEntryButton.icon}
      </HomeButton>
    </HomeAnchorLink>
  </>
);

export default HomeButtons;
