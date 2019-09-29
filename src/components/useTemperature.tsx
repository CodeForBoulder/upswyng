import { useEffect, useState } from 'react';
import axios from 'axios';

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

const useTemperature = (): undefined | null | number => {
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

  return temperature;
};

export default useTemperature;
