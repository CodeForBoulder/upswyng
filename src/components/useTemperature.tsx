import { useEffect, useState } from 'react';
import axios from 'axios';

import {
  TWeatherCoordMetaResponse,
  TWeatherLatestObservationResponse
} from '../types';

const convertCelsiusToFarenheit = (cTemp: number): number =>
  cTemp * (9 / 5) + 32;

const useTemperature = (): undefined | null | number => {
  const [temperature, setTemperature] = useState<undefined | null | number>();

  const boulderCoords = {
    lat: 40.015,
    lng: -105.2705
  };

  useEffect(() => {
    const getCoordMeta = (): Promise<TWeatherCoordMetaResponse> =>
      axios.get(
        `https://api.weather.gov/points/${boulderCoords.lat},${
          boulderCoords.lng
        }`
      );
    const getLatestObservation = (
      stationId: string
    ): Promise<TWeatherLatestObservationResponse> =>
      axios.get(
        `https://api.weather.gov/stations/${stationId}/observations/latest`
      );

    const getTemperature = async () => {
      try {
        const {
          data: coordMeta
        }: TWeatherCoordMetaResponse = await getCoordMeta();
        const {
          data: latestObservation
        }: TWeatherLatestObservationResponse = await getLatestObservation(
          coordMeta.properties.radarStation
        );

        const currentTempCelsius: number =
          latestObservation.properties.temperature.value;
        const currentTempFarenheit: number = convertCelsiusToFarenheit(
          currentTempCelsius
        );

        const roundedTemp: number = Math.round(currentTempFarenheit);
        setTemperature(roundedTemp);
      } catch (e) {
        setTemperature(null);
      }
    };

    getTemperature();
  }, [setTemperature]);

  return temperature;
};

export default useTemperature;
