import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { LinkProps } from 'react-router-dom';

export interface TEnvVariables {
  env: {
    REACT_APP_ALGOLIA_APP_ID: string;
    REACT_APP_ALGOLIA_SEARCH_API_KEY: string;
    REACT_APP_ALGOLIA_INDEX_NAME: string;
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

export interface TAddress {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
}
export interface TUser {
  id: string;
  name?: string;
  email: string;
  providers: ('facebook' | 'google')[];
  isAdmin: boolean;
  isSuperAdmin: boolean;
}
export interface TResource {
  _id?: string;
  address: TAddress;
  createdBy?: TUser;
  closeSchedule: TCloseSchedule[];
  createdAt: Date;
  deleted: boolean;
  description: string;
  id: string;
  kudos: number;
  lastModifiedAt: Date;
  latitude: number;
  legacyId?: string;
  longitude: number;
  name: string;
  phone: string;
  schedule: TSchedule[];
  services: string[];
  subcategories: TSubcategory[];
  website: string;
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

export type TCategoryStub =
  | 'food'
  | 'health'
  | 'hygiene'
  | 'job_training'
  | 'resources'
  | 'shelters'
  | 'social_services'
  | 'transit'
  | 'wifi';

export type TSubcategoryStub =
  | 'meals'
  | 'food_pantries'
  | 'emergency'
  | 'family'
  | 'youth'
  | 'abused'
  | 'pregnant'
  | 'temporary'
  | 'transitional'
  | 'restrooms'
  | 'showers'
  | 'water_fountains'
  | 'feminine_products'
  | 'bus'
  | 'bicycle'
  | 'lite_rail'
  | 'outdoor_gear'
  | 'clothing'
  | 'shoes'
  | 'legal_help'
  | 'pets'
  | 'laundry'
  | 'hair_care'
  | 'home_goods'
  | 'hospital'
  | 'clinics'
  | 'mental'
  | 'dental'
  | 'pharmacies'
  | 'vision'
  | 'addiction_recovery_services'
  | 'free_wifi'
  | 'public_computer'
  | 'charging'
  | 'ready_to_work'
  | 'craigslist'
  | 'temp_agency'
  | 'day_labor'
  | 'career_counseling'
  | 'health_and_human_services'
  | 'food_stamps'
  | 'social_security';

export interface TCategory {
  _id: string;
  color: string;
  createdAt: Date;
  lastModifiedAt: Date;
  name: string;
  stub: TCategoryStub;
  subcategories: TSubcategory[];
}

export interface TSubcategory {
  _id: string;
  createdAt: Date;
  lastModifiedAt: Date;
  name: string;
  parentCategory: TCategory;
  resources?: TResource[];
  stub: TSubcategoryStub;
}

export type TSchedulePeriod =
  | 'Last'
  | 'First'
  | 'Second'
  | 'Third'
  | 'Fourth'
  | 'Fifth';

export type TScheduleType = 'Weekly' | 'Monthly' | 'Open 24/7' | 'Date Range';

interface TScheduleBase {
  _id?: string;
  day: TDay;
  date?: string;
  period?: TSchedulePeriod;
  from: string;
  to: string;
}

export interface TSchedule extends TScheduleBase {
  scheduleType: TScheduleType;
}

export type TCloseScheduleType = TScheduleType | 'Permanently Closed';

export interface TCloseSchedule extends TScheduleBase {
  scheduleType: TCloseScheduleType;
}
export interface TResourceCategory {
  text: string;
  stub: TCategoryStub;
}

export interface TResourceSubcategory {
  text: string;
  stub: TSubcategoryStub;
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
