import { SvgIconProps } from '@material-ui/core/SvgIcon';

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
  charityName: string;
  city: string;
  closeSchedule: TCloseSchedule[];
  description: string;
  kudos: number;
  lat: number;
  lng: number;
  phone: string;
  schedule: TSchedule[];
  selectedAll: boolean;
  service: string;
  serviceType: string;
  showFlag: boolean;
  state: string;
  updateShelter: string;
  userEmail: string;
  userId: string;
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
  fromString: string;
  toString: string;
  type: string;
}

export interface THomeButton {
  text: string;
  icon: React.ReactElement<SvgIconProps>;
  to: string;
}
