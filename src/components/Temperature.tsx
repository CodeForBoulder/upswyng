import React, { useEffect, useState } from 'react';

import { Typography } from '@material-ui/core';
import axios from 'axios';
import styled from 'styled-components';

import { colors, font } from '../App.styles';

const StyledContainer = styled.aside`
  color: ${colors.white};
  font-family: ${font.families.openSans};
`;

const StyledTemp = styled.p`
  align-items: flex-end;
  border-right: solid 2px ${colors.white};
  display: flex;
  flex-direction: column;
  margin-right: ${font.helpers.convertPixelsToRems(12)};
  padding: ${font.helpers.convertPixelsToRems(5)}
    ${font.helpers.convertPixelsToRems(8)};
`;

const StyledDegrees = styled.span`
  font-size: ${font.helpers.convertPixelsToRems(18)};
  line-height: 1;
  font-weight: 700;
  margin: 0;
  padding: 0;
`;

const StyledLocation = styled.span`
  font-size: ${font.helpers.convertPixelsToRems(12)};
  margin: 0;
  padding: 0;
`;

const Temperature = () => {
  const [temperature, setTemperature] = useState('');

  useEffect(() => {
    const getWeather = () =>
      axios
        .get('https://www.ncdc.noaa.gov/cdo-web/api/v2/location/', {})
        .then(res => {})
        .catch(res => {
          setTemperature('58');
        });

    getWeather();
  }, [setTemperature]);

  return (
    <StyledContainer>
      <Typography variant="srOnly" component="h2">
        Current Temperature
      </Typography>
      <StyledTemp>
        <StyledDegrees>{temperature}&deg;</StyledDegrees>
        <Typography variant="srOnly">in</Typography>
        <StyledLocation>Boulder, CO</StyledLocation>
      </StyledTemp>
    </StyledContainer>
  );
};

export default Temperature;
