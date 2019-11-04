import React from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import { darken } from "polished";

import styled, { css } from "styled-components";
import { colors, font } from "../App.styles";

const baseButtonStyles = css`
  color: ${colors.white};
  font-family: ${font.families.openSans};
  font-size: ${font.helpers.convertPixelsToRems(16)};
  text-transform: none;
  &:hover,
  &:focus {
    background: ${darken(0.05, colors.charcoal)};
  }
`;

const UnSelectedSubCategoryButton = styled(Button)`
  && {
    ${baseButtonStyles}
  }
` as typeof Button;

interface Props extends ButtonProps {
  buttonColor: string;
  isSelected: boolean;
}

const SubCategoryButton = ({
  children,
  buttonColor,
  isSelected,
  ...rest
}: Props) => {
  const SelectedSubCategoryButton = styled(Button)`
    && {
      ${baseButtonStyles}
      background: ${buttonColor};
      &:hover,
      &:focus {
        background: ${darken(0.1, buttonColor)};
      }
    }
  ` as typeof Button;

  return isSelected ? (
    <SelectedSubCategoryButton component="span" {...rest}>
      {children}
    </SelectedSubCategoryButton>
  ) : (
    <UnSelectedSubCategoryButton component="span" {...rest}>
      {children}
    </UnSelectedSubCategoryButton>
  );
};

export default SubCategoryButton;
