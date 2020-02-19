import axios from "axios";

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

class WeatherCache {
  millisecondsToExp: number;
  fetchFunction: typeof getCurrentWeather;
  cache: TWeatherCurrentResponse;
  fetchDate: Date;
  constructor(fetchFunction: () => Promise<TWeatherCurrentResponse>) {
    this.millisecondsToExp = 600000;
    this.fetchFunction = fetchFunction;
    this.cache = null;
    this.getData = this.getData.bind(this);
    this.resetCache = this.resetCache.bind(this);
    this.isCacheExpired = this.isCacheExpired.bind(this);
    this.fetchDate = new Date(0);
  }
  async getData() {
    if (!this.cache || this.isCacheExpired()) {
      console.log("Fetching new weather data");
      const data = await this.fetchFunction(40.015, -105.2705);
      this.cache = data;
      this.fetchDate = new Date();
      return data;
    } else {
      console.log("Returning cached weather data");
      return Promise.resolve(this.cache);
    }
  }
  isCacheExpired() {
    return (
      this.fetchDate.getTime() + this.millisecondsToExp < new Date().getTime()
    );
  }
  resetCache() {
    this.fetchDate = new Date(0);
  }
}

const weather = new WeatherCache(() => getCurrentWeather(40.015, -105.2705));

export async function get(req, res) {
  try {
    const result = await weather.getData();
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ ...result }));
  } catch (e) {
    console.error(e);
    res.writeHead(500, {
      "Content-Type": "application/json",
    });

    return res.end(
      JSON.stringify({
        message: `Error fetching weather information: ${e.message}`,
      })
    );
  }
}

export interface TWeatherCurrentItem {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface TWeatherCurrentResponse {
  coord: { lon: number; lat: number };
  weather: TWeatherCurrentItem[];
  base: string;
  main: {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    sea_level: number;
    grnd_level: number;
  };
  wind: { speed: number; deg: number };
  clouds: { all: number };
  dt: number;
  sys: {
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  id: number;
  name: string;
  cod: number;
}
