import React from 'react';
import { Button } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import styled from 'styled-components';
import { colors, fonts } from '../App.styles';

interface HomeLinkPropsBase {
  children: React.ReactElement | React.ReactElement[];
  key: string;
}

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

export default HomeButton;
