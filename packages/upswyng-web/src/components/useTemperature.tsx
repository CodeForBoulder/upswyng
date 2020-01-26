import { TEnvVariables, TWeatherCurrentResponse } from "../webTypes";
import { useEffect, useState } from "react";

import axios from "axios";

declare const process: TEnvVariables;

const GET_TEMP_INTERVAL_MS = 600000;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const convertCelsiusToFarenheit = (cTemp: number): number =>
  cTemp * (9 / 5) + 32;

const useTemperature = (): undefined | null | number => {
  const [temperature, setTemperature] = useState<undefined | null | number>();

  useEffect(() => {
    const boulderCoords = {
      lat: 40.015,
      lon: -105.2705,
    };

    const getCurrentTemp = async (): Promise<void> => {
      try {
        const { data } = await axios.get<TWeatherCurrentResponse>(
          "https://api.openweathermap.org/data/2.5/weather?units=imperial",
          {
            params: {
              lat: boulderCoords.lat,
              lon: boulderCoords.lon,
              APPID: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
            },
          }
        );
        const currentTemp: number = data.main.temp;

        const roundedTemp: number = Math.round(currentTemp);
        setTemperature(roundedTemp);
      } catch (err) {
        // TODO: log this error
        setTemperature(null);
      }
    };

    getCurrentTemp();
    const getTemperatureInterval = window.setInterval(
      getCurrentTemp,
      GET_TEMP_INTERVAL_MS
    );

    return () => window.clearInterval(getTemperatureInterval);
  }, [setTemperature]);

  return temperature;
};

export default useTemperature;
