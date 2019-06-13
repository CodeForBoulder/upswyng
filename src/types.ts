import { SvgIconProps } from '@material-ui/core/SvgIcon';

export type TDay =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

// Legacy resource shape from Strapped
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

export interface TUpswyngResource {
  address: {
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: number;
  };
  category: string;
  closeSchedule: TCloseSchedule[];
  description: string;
  isApproved: boolean;
  kudos: number;
  location: TFirebaseLocation;
  name: string;
  phone: string;
  schedule: TUpswyngSchedule[];
  selectedAll: boolean;
  serviceSubtype: string;
  serviceType: string;
  shouldShow: boolean;
  updateDate: TFirebaseTimestamp;
  user: { email: string; id: string };
  websiteUrl: string;
}

interface TFirebaseLocation {
  _latitude: number;
  _longitude: number;
}

export interface TFirebaseTimestamp {
  _nanoseconds: number;
  _seconds: number;
}

export interface TCloseSchedule {
  day: TDay;
  period: string;
  type: string;
}

export interface TUpswyngSchedule {
  day: TDay;
  from: string;
  to: string;
  type: string;
}

// Legacy Schedule shape from Strapped
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
}
