import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { LinkProps } from "react-router-dom";
import { TCategory, TResource, TSubcategory } from "@upswyng/upswyng-types";

export interface TEnvVariables {
  env: {
    REACT_APP_ALGOLIA_APP_ID: string;
    REACT_APP_ALGOLIA_SEARCH_API_KEY: string;
    REACT_APP_ALGOLIA_INDEX_NAME: string;
    REACT_APP_GOOGLE_MAPS_API_KEY: string;
    REACT_APP_GOOGLE_TAG_MANAGER_CONTAINER_ID: string;
    REACT_APP_GOOGLE_TAG_MANAGER_AUTH: string;
    REACT_APP_GOOGLE_TAG_MANAGER_PREVIEW: string;
    REACT_APP_OPEN_WEATHER_API_KEY: string;
  };
}

interface TPayloadBase {
  message?: string;
}

export interface TResourcePayload extends TPayloadBase {
  resource?: TResource;
}

export interface TResourcesByCategoryPayload extends TPayloadBase {
  category?: TCategory;
}

export interface TResourcesBySubcategoryPayload extends TPayloadBase {
  subcategory?: TSubcategory;
}

interface THomeButtonBase {
  color: string;
  icon: React.ReactElement<SvgIconProps>;
  text: string;
}
export interface THomeButtonAnchor extends THomeButtonBase {
  href: string;
  target: string;
  rel: string;
}

export interface THomeButtonRouterLink extends THomeButtonBase {
  linkProps: LinkProps;
}

export interface TWeatherCurrentItem {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface TResourceCategory {
  text: string;
  stub: string;
}

export interface TResourceSubcategory {
  text: string;
  stub: string;
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

export type TGoogleMapTravelMode =
  | "TRANSIT"
  | "DRIVING"
  | "WALKING"
  | "BICYCLING";

export type TGoogleMapDirectionsStatusCode =
  | "OK"
  | "ZERO_RESULTS"
  | "MAX_WAYPOINTS_EXCEEDED"
  | "MAX_ROUTE_LENGTH_EXCEEDED"
  | "INVALID_REQUEST"
  | "OVER_DAILY_LIMIT"
  | "OVER_QUERY_LIMIT"
  | "REQUEST_DENIED"
  | "UNKNOWN_ERROR";
