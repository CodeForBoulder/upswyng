import { TResourceNew } from './types';

export const blankResource: TResourceNew = {
  _id: '',
  address: {
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  },
  createdBy: {
    id: '',
    name: '',
    email: '',
    providers: ['facebook', 'google'],
    isAdmin: false,
    isSuperAdmin: false
  },
  closeSchedule: [],
  createdAt: new Date(),
  deleted: false,
  description: '',
  id: '',
  kudos: 0,
  lastModifiedAt: new Date(),
  latitude: 0,
  legacyId: '',
  longitude: 0,
  name: '',
  phone: '',
  schedule: [],
  services: [''],
  subcategories: [],
  website: ''
};

export const foodResource: TResourceNew = {
  address: {
    address1: '220 Collyer St',
    city: 'Longmont',
    state: 'CO',
    zip: '80501'
  },
  location: { coordinates: [-105.09771369999999, 40.1630592], type: 'Point' },
  deleted: false,
  kudos: 0,
  services: ['Breakfast\\Lunch'],
  _id: '5d9431ab521d2e1c354bd23d',
  closeSchedule: [],
  description:
    'Our Hospitality Care services can all be found inside our facility. New members must become a participant first by meeting with a trained Resource Navigator and  once a plan is agree upon these services may be offered to assist with basic need expenses. Warm, nutritious meals are created 364 days a year with our assistance of our in-house cook and volunteer staff. Weekend meals are provided by Café Outreach Team’s which are families, schools, businesses, and faith-based groups from our community. Community Cafe Lunch 7 days a week 11:30am-1pm. Breakfast M-F 8:30am-9:30am.',
  id: '5d9431ab521d2e1c354bd23c',
  legacyId: '-KZomZhy4WBsvTu6tcXC',
  name: 'OUR Center Community Cafe',
  phone: '(303) 772-5529',
  schedule: [
    {
      _id: '5d9431ab521d2e1c354bd249',
      day: 'Monday',
      to: '9:30 AM',
      scheduleType: 'Weekly'
    },
    {
      _id: '5d9431ab521d2e1c354bd248',
      day: 'Monday',
      to: '1:00 PM',
      scheduleType: 'Weekly'
    },
    {
      _id: '5d9431ab521d2e1c354bd247',
      day: 'Tuesday',
      to: '9:30 AM',
      scheduleType: 'Weekly'
    },
    {
      _id: '5d9431ab521d2e1c354bd246',
      day: 'Tuesday',
      to: '1:00 PM',
      scheduleType: 'Weekly'
    },
    {
      _id: '5d9431ab521d2e1c354bd245',
      day: 'Wednesday',
      to: '9:30 AM',
      scheduleType: 'Weekly'
    },
    {
      _id: '5d9431ab521d2e1c354bd244',
      day: 'Wednesday',
      to: '1:00 PM',
      scheduleType: 'Weekly'
    },
    {
      _id: '5d9431ab521d2e1c354bd243',
      day: 'Thursday',
      to: '9:30 AM',
      scheduleType: 'Weekly'
    },
    {
      _id: '5d9431ab521d2e1c354bd242',
      day: 'Thursday',
      to: '1:00 PM',
      scheduleType: 'Weekly'
    },
    {
      _id: '5d9431ab521d2e1c354bd241',
      day: 'Friday',
      to: '9:30 AM',
      scheduleType: 'Weekly'
    },
    {
      _id: '5d9431ab521d2e1c354bd240',
      day: 'Friday',
      to: '1:00 PM',
      scheduleType: 'Weekly'
    },
    {
      _id: '5d9431ab521d2e1c354bd23f',
      day: 'Saturday',
      to: '1:00 PM',
      scheduleType: 'Weekly'
    },
    {
      _id: '5d9431ab521d2e1c354bd23e',
      day: 'Sunday',
      to: '1:00 PM',
      scheduleType: 'Weekly'
    }
  ],
  website: 'https://www.ourcenter.org/hospitality-care/'
};
