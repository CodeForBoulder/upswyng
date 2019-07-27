import React from 'react';
import styled from 'styled-components';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { colors, font } from '../App.styles';

interface CheckboxInputProps {
  label: string;
  onChange: Function;
  value: string;
}

const StyledFormControlLabel = styled(FormControlLabel)`
  span {
    color: ${colors.white};
    font-family: ${font.families.openSans};
  }
` as typeof FormControlLabel;

const CheckboxInput = (props: CheckboxInputProps) => (
  <StyledFormControlLabel
    control={<Checkbox onChange={() => props.onChange()} value={props.value} />}
    label={props.label}
  />
);

export default CheckboxInput;
