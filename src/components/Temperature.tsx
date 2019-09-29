import React, { useEffect, useState } from 'react';

import { Tooltip, Typography } from '@material-ui/core';
import { ErrorOutline as ErrorOutlineIcon } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
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
    ${font.helpers.convertPixelsToRems(10)};
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

const StyledTooltip = styled(props => (
  <Tooltip
    classes={{ popper: props.className, tooltip: 'tooltip' }}
    {...props}
  />
))`
  & .tooltip {
    background: ${colors.black};
    colors: ${colors.white};
    font-family: ${font.families.openSans};
  }
` as typeof Tooltip;

interface TCoordMeta {
  data: {
    properties: {
      radarStation: string;
    };
  };
}

interface TLatestObservation {
  data: {
    properties: {
      temperature: {
        value: number;
      };
    };
  };
}

const convertCelsiusToFarenheit = (cTemp: number) => cTemp * (9 / 5) + 32;

const Temperature = () => {
  const [temperature, setTemperature] = useState<undefined | null | number>();

  const boulderCoords = {
    lat: 40.015,
    lng: -105.2705
  };

  useEffect(() => {
    const getCoordMeta = (): Promise<TCoordMeta> =>
      axios.get(
        `https://api.weather.gov/points/${boulderCoords.lat},${
          boulderCoords.lng
        }`
      );
    const getLatestObservation = (
      stationId: string
    ): Promise<TLatestObservation> =>
      axios.get(
        `https://api.weather.gov/stations/${stationId}/observations/latest`,
        {}
      );

    const getTemperature = async () => {
      try {
        const { data: coordMeta } = await getCoordMeta();
        const { data: latestObservation } = await getLatestObservation(
          coordMeta.properties.radarStation
        );
        const currentTempCelsius =
          latestObservation.properties.temperature.value;
        const currentTempFarenheit = convertCelsiusToFarenheit(
          currentTempCelsius
        );
        const roundedTemp = Math.round(currentTempFarenheit);
        setTemperature(roundedTemp);
      } catch (e) {
        setTemperature(null);
      }
    };

    getTemperature();
  }, [setTemperature]);

  return (
    <StyledContainer>
      <Typography variant="srOnly" component="h2">
        Current Temperature
      </Typography>
      <StyledTemp>
        {temperature === undefined && (
          <Skeleton variant="rect" height={19} width={40} />
        )}
        {temperature === null && (
          <StyledTooltip
            placement="left"
            title="temperature currently unavailable"
          >
            <ErrorOutlineIcon fontSize="small" tabIndex={0} />
          </StyledTooltip>
        )}
        {temperature && <StyledDegrees>{temperature}&deg;</StyledDegrees>}
        <Typography variant="srOnly">in</Typography>
        <StyledLocation>Boulder, CO</StyledLocation>
      </StyledTemp>
    </StyledContainer>
  );
};

export default Temperature;
