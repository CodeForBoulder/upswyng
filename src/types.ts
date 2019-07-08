import { SvgIconProps } from '@material-ui/core/SvgIcon';

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
}

export interface TCloseSchedule {
  day: TDay;
  period: string;
  type: string;
}

export interface TSchedule {
  day: TDay;
  fromstring: string;
  tostring: string;
  type: string;
}

export interface THomeButton {
  text: string;
  icon: React.ReactElement<SvgIconProps>;
  to: string;
  color: string;
}
