import { useEffect, useState } from "react";

import { TWeatherCurrentResponse } from "@upswyng/types";
import apiClient from "../utils/apiClient";

let serverUri = process.env.REACT_APP_SERVER_URI || "http://localhost:3000";
if (serverUri.charAt(serverUri.length - 1) === "/") {
  serverUri = serverUri.slice(0, -1);
}

const GET_TEMP_INTERVAL_MS = 60000;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const convertCelsiusToFarenheit = (cTemp: number): number =>
  cTemp * (9 / 5) + 32;

const useTemperature = (): undefined | null | number => {
  const [temperature, setTemperature] = useState<undefined | null | number>();

  useEffect(() => {
    const boulderCoords = {
      latitude: 40.015,
      longitude: -105.2705,
    };

    const getCurrentTemp = async (): Promise<void> => {
      try {
        const { data } = await apiClient.get<TWeatherCurrentResponse>(
          `/weather`,
          {
            params: {
              latitude: boulderCoords.latitude,
              longitude: boulderCoords.longitude,
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
