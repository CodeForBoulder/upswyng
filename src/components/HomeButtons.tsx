import React from 'react';
import { Button } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
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
import { colors, fonts } from '../App.styles';

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

interface HomeLinkPropsBase {
  children: React.ReactElement | React.ReactElement[];
  key: string;
}

type HomeRouterLinkProps = HomeLinkPropsBase & THomeButtonRouterLink;
type HomeAnchorProps = HomeLinkPropsBase & THomeButtonAnchor;

const HomeLinkStyles = css`
  display: block;
  flex: 1 1 50%;
  padding: 4px;
  text-decoration: none;
  width: 100%;
`;

const HomeRouterLink = styled((props: HomeRouterLinkProps) => {
  const { children, key, linkProps, ...rest } = props;
  return (
    <Link {...linkProps} key={key} {...rest}>
      {children}
    </Link>
  );
})`
  ${HomeLinkStyles}
`;

const HomeAnchorLink = styled((props: HomeAnchorProps) => {
  const { children, key, href, target, ...rest } = props;
  return (
    <a key={key} href={href} target={target} {...rest}>
      {children}
    </a>
  );
})`
  ${HomeLinkStyles}
`;
interface HomeButtonProps extends ButtonProps {
  readonly buttonColor: string;
}

const HomeButton = styled((props: HomeButtonProps) => {
  const { buttonColor, ...rest } = props;
  return <Button {...rest} />;
})`
  && {
    align-items: stretch;
    background: ${(props: HomeButtonProps) =>
      props.buttonColor || colors.greyDark};
    border-radius: 0;
    color: ${colors.white};
    display: flex;
    height: 100%;
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
    max-height: 45px;
    width: 42px;
  }
`;

const HomeButtons = () => (
  <>
    {routerLinkButtons.map(button => {
      return (
        <HomeRouterLink {...button} key={button.text}>
          <HomeButton
            disableRipple={true}
            component={'span'}
            buttonColor={button.color}
          >
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
      <HomeButton
        disableRipple={true}
        component={'span'}
        buttonColor={coordinatedEntryButton.color}
      >
        {coordinatedEntryButton.text}
        {coordinatedEntryButton.icon}
      </HomeButton>
    </HomeAnchorLink>
  </>
);

export default HomeButtons;
