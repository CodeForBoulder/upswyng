import { convertResource } from '../convertStrappedToUpswyng';
import { TResource, TUpswyngResource } from '../../types';

const charity: TResource = {
  address1: '666 E 22nd Ave',
  address2: 'Test Addy 2',
  approved: 0,
  category: 'Men,Women',
  charityname: 'Test Charity',
  city: 'Denver',
  closeschedule: [{ day: 'Wednesday', period: 'First', type: 'Monthly' }],
  description: '"Metro Caring\'s largest program"',
  kudos: 3,
  lat: 39.74,
  lng: -104.97,
  phone: '(303) 860-7200',
  schedule: [
    {
      day: 'Monday',
      fromstring: '9:30 AM',
      tostring: '3:00 PM',
      type: 'Weekly'
    },
    {
      day: 'Tuesday',
      fromstring: '9:30 AM',
      tostring: '3:00 PM',
      type: 'Weekly'
    }
  ],
  selectedAll: true,
  service: 'Food',
  servicetype: 'Food Pantry',
  showflag: false,
  state: 'CO',
  updateshelter: '09/19/2016 10:25 PM',
  useremail: 'tester@gmail.com',
  userid: '2345sd-adfsg536',
  website: 'http://www.placeholder.org',
  zip: 80203
};

const resource: TUpswyngResource = {
  address: {
    address1: '666 E 22nd Ave',
    address2: 'Test Addy 2',
    city: 'Denver',
    state: 'CO',
    zip: 80203
  },
  category: 'Men,Women',
  closeSchedule: [{ day: 'Wednesday', period: 'First', type: 'Monthly' }],
  description: '"Metro Caring\'s largest program"',
  isApproved: false,
  kudos: 3,
  location: { _latitude: 39.74, _longitude: -104.97 },
  name: 'Test Charity',
  phone: '(303) 860-7200',
  schedule: [
    { day: 'Monday', from: '9:30 AM', to: '3:00 PM', type: 'Weekly' },
    { day: 'Tuesday', from: '9:30 AM', to: '3:00 PM', type: 'Weekly' }
  ],
  selectedAll: true,
  serviceSubtype: 'Food Pantry',
  serviceType: 'Food',
  shouldShow: false,
  updateDate: { _nanoseconds: 0, _seconds: 1474367100 },
  user: { email: 'tester@gmail.com', id: '2345sd-adfsg536' },
  websiteUrl: 'http://www.placeholder.org'
};

test('Converts a strapped charity to an upswyng resource', () => {
  expect(convertResource(charity)).toEqual(resource);
});
