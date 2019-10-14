import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { LinkProps } from 'react-router-dom';

export interface TEnvVariables {
  env: {
    REACT_APP_ALGOLIA_APP_ID: string;
    REACT_APP_ALGOLIA_SEARCH_API_KEY: string;
    REACT_APP_ALGOLIA_INDEX_NAME: string;
    REACT_APP_FIREBASE_API_KEY: string;
    REACT_APP_FIREBASE_AUTH_DOMAIN: string;
    REACT_APP_FIREBASE_DATABASE_URL: string;
    REACT_APP_FIREBASE_PROJECT_ID: string;
    REACT_APP_FIREBASE_STORAGE_BUCKET: string;
    REACT_APP_FIREBASE_MESSAGE_SENDER_ID: string;
    REACT_APP_GOOGLE_MAPS_API_KEY: string;
    REACT_APP_OPEN_WEATHER_API_KEY: string;
  };
}

export type TDay =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface TResource {
  address1: string;
  address2: string;
  approved: 0 | 1;
  category: string;
  charityname: string;
  city: string;
  closeschedule: TCloseSchedule[];
  description: string;
  kudos: number;
  lat: number;
  lng: number;
  phone: string;
  schedule: TSchedule[];
  selectedAll: boolean;
  service: string;
  servicetype: string;
  showflag: boolean;
  state: string;
  updateshelter: string;
  useremail: string;
  userid: string;
  website: string;
  zip: number;
  [key: string]: TCloseSchedule[] | TSchedule[] | boolean | string | number;
}

export interface TCloseSchedule {
  day: TDay;
  period: string;
  type: string;
}

export interface TSchedule {
  day: TDay;
  period?: TSchedulePeriod;
  fromstring: string;
  tostring: string;
  type: TScheduleType;
}

export type TSchedulePeriod = 'First' | 'Second' | 'Third' | 'Fourth';

export type TScheduleType = 'Weekly' | 'Monthly' | 'Open 24/7' | 'Date Range';

export interface TResourceCategory {
  text: string;
  query: string;
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
  | 'TRANSIT'
  | 'DRIVING'
  | 'WALKING'
  | 'BICYCLING';

export type TGoogleMapDirectionsStatusCode =
  | 'OK'
  | 'ZERO_RESULTS'
  | 'MAX_WAYPOINTS_EXCEEDED'
  | 'MAX_ROUTE_LENGTH_EXCEEDED'
  | 'INVALID_REQUEST'
  | 'OVER_DAILY_LIMIT'
  | 'OVER_QUERY_LIMIT'
  | 'REQUEST_DENIED'
  | 'UNKNOWN_ERROR';
