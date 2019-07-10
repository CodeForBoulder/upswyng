import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
import { THomeButton } from '../types';
import { colors, fonts } from '../App.styles';

const buttons: THomeButton[] = [
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
  },
  {
    text: 'Coordinated Entry',
    href: 'https://www.bouldercounty.org/homeless/',
    icon: DoorIcon,
    color: colors.rosewood,
    target: '_blank'
  }
];
interface HomeLinkProps extends THomeButton {
  children: React.ReactElement | React.ReactElement[];
  key: string;
}

const HomeLink = styled((props: HomeLinkProps) => {
  const { children, href, key, linkProps, ...rest } = props;
  if (href) {
    return (
      <a {...props} key={key}>
        {children}
      </a>
    );
  }
  if (linkProps) {
    return (
      <Link {...linkProps} key={key} {...rest}>
        {children}
      </Link>
    );
  }
  return null;
})`
  display: block;
  flex: 1 1 50%;
  padding: 4px;
  text-decoration: none;
  width: 100%;
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
    {buttons.map((button: THomeButton) => {
      return (
        <HomeLink {...button} key={button.text}>
          <HomeButton
            disableRipple={true}
            component={'span'}
            buttonColor={button.color}
          >
            {button.text}
            {button.icon}
          </HomeButton>
        </HomeLink>
      );
    })}
  </>
);

export default HomeButtons;
