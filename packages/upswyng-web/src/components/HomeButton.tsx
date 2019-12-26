import { colors, font } from "../App.styles";

import { ButtonProps } from "@material-ui/core/Button";
import React from "react";
import styled from "styled-components";

interface HomeLinkPropsBase {
  children: React.ReactElement | React.ReactElement[];
  key: string;
}

interface HomeButtonProps extends ButtonProps {
  readonly buttonColor: string;
}

const HomeButton = styled.span`
  && {
    align-items: stretch;
    background: ${(props: HomeButtonProps) =>
      props.buttonColor || colors.greyDark};
    border-radius: 0;
    color: ${colors.white};
    display: flex;
    flex-direction: column;
    font-family: ${font.families.openSans};
    font-size: ${font.helpers.convertPixelsToRems(22)};
    font-weight: 700;
    justify-content: space-between;
    line-height: ${font.helpers.convertPixelsToRems(24)};
    padding: ${font.helpers.convertPixelsToRems(10)};
    text-decoration: none;
    text-transform: none;
    width: 100%;
  }
  &&:hover {
    background: ${(props: HomeButtonProps) =>
      props.buttonColor || colors.greyDark};
    filter: brightness(95%);
  }
  svg {
    align-self: flex-end;
    height: auto;
    max-height: ${font.helpers.convertPixelsToRems(45)};
    width: ${font.helpers.convertPixelsToRems(42)};
  }
`;

export default HomeButton;
