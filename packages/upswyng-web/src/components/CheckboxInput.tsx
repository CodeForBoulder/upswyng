import React from "react";
import styled from "styled-components";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { colors, font } from "../App.styles";

interface CheckboxInputProps {
  checked: boolean;
  disabled: boolean;
  label: string;
  onChange: Function;
  value: string;
}

const StyledFormControlLabel = styled(FormControlLabel)`
  && {
    opacity: ${props => (props.disabled ? "0.25" : "1")};
    transition: opacity 300ms ease-in;
  }
  && span {
    color: ${colors.white};
    font-family: ${font.families.openSans};
  }
` as typeof FormControlLabel;

const CheckboxInput = (props: CheckboxInputProps) => (
  <StyledFormControlLabel
    disabled={props.disabled}
    control={
      <Checkbox
        checked={props.checked}
        onChange={() => props.onChange()}
        value={props.value}
        disabled={props.disabled}
      />
    }
    label={props.label}
  />
);

export default CheckboxInput;
