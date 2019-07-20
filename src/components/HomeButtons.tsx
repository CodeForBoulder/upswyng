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
import { colors, font } from '../App.styles';

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
      to: '/shelter'
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
    text: 'Wifi & Tech',
    icon: WifiIcon,
    linkProps: {
      to: '/wifi-and-tech'
    },
    color: colors.blue
  },
  {
    text: 'Job Training',
    icon: BusinessCenterIcon,
    linkProps: {
      to: '/work'
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
    height: 100%;
    padding: ${font.helpers.convertPixelsToRems(10)};
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
    font-family: ${font.families.openSans};
    font-size: ${font.helpers.convertPixelsToRems(22)};
    font-weight: 700;
    justify-content: space-between;
    line-height: ${font.helpers.convertPixelsToRems(24)};
    text-transform: none;
  }
  svg {
    align-self: flex-end;
    height: auto;
    width: ${font.helpers.convertPixelsToRems(42)};
  }
`;

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
