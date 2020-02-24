import Cache from "../../utility/cache";
import { TWeatherCurrentResponse } from "@upswyng/upswyng-types";
import axios from "axios";

const cache = new Cache();

const getCurrentWeather = async (
  lat: number | null,
  lon: number | null
): Promise<TWeatherCurrentResponse> => {
  try {
    const { data } = await axios.get<TWeatherCurrentResponse>(
      "https://api.openweathermap.org/data/2.5/weather?units=imperial",
      {
        params: {
          lat: lat,
          lon: lon,
          APPID: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
        },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getCachedWeatherData = async (
  latitude: number,
  longitude: number
): Promise<Record<string, any>> => {
  const key = `${latitude}${longitude}`;
  if (!cache.getValue(key) || cache.isExpired(key, new Date())) {
    cache.setValue(key, getCurrentWeather(latitude, longitude));
    cache.setExpiration(key, new Date(), 60000);
  }
  return cache.getValue(key);
};

export async function get(req, res) {
  try {
    const result = await getCachedWeatherData(
      +req.query.latitude,
      +req.query.longitude
    );
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ ...result }));
  } catch (e) {
    console.error(e);
    return res.setStatus(500).json({
      message: `Error fetching weather information: ${e.message}`,
    });
  }
}
