import React from 'react';
import styled from 'styled-components';
import { Checkbox, FormControlLabel } from '@material-ui/core';

interface CheckboxInputProps {
  label: string;
  onChange: Function;
  value: string;
}

const CheckboxInput = (props: CheckboxInputProps) => (
  <FormControlLabel
    control={<Checkbox onChange={() => props.onChange()} value={props.value} />}
    label={props.label}
  />
);

export default CheckboxInput;
