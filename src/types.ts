import { SvgIconProps } from 'material-ui';

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
}
