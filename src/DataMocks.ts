import { TResource } from './types';

export const blankResource: TResource = {
  address1: '',
  address2: '',
  approved: 0,
  category: '',
  charityName: '',
  city: '',
  closeSchedule: [],
  description: '',
  kudos: 0,
  lat: 0,
  lng: 0,
  phone: '',
  schedule: [],
  selectedAll: false,
  service: '',
  serviceType: '',
  showFlag: false,
  state: '',
  updateShelter: '',
  userEmail: '',
  userId: '',
  website: '',
  zip: 0
};

export const foodResource: TResource = {
  address1: '1100 E 18th Ave',
  address2: '',
  approved: 1,
  category: 'Men,Women,Kids,Seniors,Families,Veterans,LGBT+,All',
  charityName: 'Metro Caring',
  city: 'Denver',
  closeSchedule: [
    {
      day: 'Wednesday',
      period: 'First',
      type: 'Monthly'
    }
  ],
  description:
    '"Metro Caring\'s largest program, Healthful Foods Access, ensures that hungry families and individuals have nutritious food to meet their immediate need and avoid hunger in the short term while they work toward self-reliance. Instead of receiving a pre-packed or standard bag of groceries, families and individuals shop for free at the Metro Caring Fresh-Foods Market. A "choice" model gives participants control over their food selection, allows for cultural and dietary preferences, and reduces waste. Volunteer Market Assistants offer samples of different nutritious foods that people may be unfamiliar with, and provide personal assistance when needed."',
  kudos: 1,
  lat: 39.7445915,
  lng: -104.97300459999997,
  phone: '(303) 860-7200',
  schedule: [
    {
      day: 'Monday',
      fromString: '9:30 AM',
      toString: '3:00 PM',
      type: 'Weekly'
    },
    {
      day: 'Tuesday',
      fromString: '9:30 AM',
      toString: '3:00 PM',
      type: 'Weekly'
    },
    {
      day: 'Tuesday',
      fromString: '6:00 PM',
      toString: '8:00 PM',
      type: 'Weekly'
    },
    {
      day: 'Wednesday',
      fromString: '9:30 AM',
      toString: '3:00 PM',
      type: 'Weekly'
    },
    {
      day: 'Thursday',
      fromString: '9:30 AM',
      toString: '3:00 PM',
      type: 'Weekly'
    },
    {
      day: 'Friday',
      fromString: '9:30 AM',
      toString: '3:00 PM',
      type: 'Weekly'
    }
  ],
  selectedAll: true,
  service: 'Food',
  serviceType: 'Food Pantry',
  showFlag: true,
  state: 'CO',
  updateShelter: '09/19/2016 10:25 PM',
  userEmail: 'patrudu36@gmail.com',
  userId: '70b8446e-61ca-41c9-93f9-9f3fb4996e6c',
  website: 'http://www.metrocaring.org',
  zip: 80203
};
