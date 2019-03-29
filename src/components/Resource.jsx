import React from 'react';
import Carousel from './Carousel';

export const resourceApiReturn = {
  '-KS4rbQziVbJM5tNdEQL': {
    address1: '1100 E 18th Ave',
    address2: '',
    approved: 1,
    category: 'Men,Women,Kids,Seniors,Families,Veterans,LGBT+,All',
    charityname: 'Metro Caring',
    city: 'Denver',
    closeschedule: [
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
        fromstring: '9:30 AM',
        tostring: '3:00 PM',
        type: 'Weekly'
      },
      {
        day: 'Tuesday',
        fromstring: '9:30 AM',
        tostring: '3:00 PM',
        type: 'Weekly'
      },
      {
        day: 'Tuesday',
        fromstring: '6:00 PM',
        tostring: '8:00 PM',
        type: 'Weekly'
      },
      {
        day: 'Wednesday',
        fromstring: '9:30 AM',
        tostring: '3:00 PM',
        type: 'Weekly'
      },
      {
        day: 'Thursday',
        fromstring: '9:30 AM',
        tostring: '3:00 PM',
        type: 'Weekly'
      },
      {
        day: 'Friday',
        fromstring: '9:30 AM',
        tostring: '3:00 PM',
        type: 'Weekly'
      }
    ],
    selectedAll: true,
    service: 'Food',
    servicetype: 'Food Pantry',
    showflag: true,
    state: 'CO',
    updateshelter: '09/19/2016 10:25 PM',
    useremail: 'patrudu36@gmail.com',
    userid: '70b8446e-61ca-41c9-93f9-9f3fb4996e6c',
    website: 'http://www.metrocaring.org',
    zip: 80203
  }
};

const Resource = props => {
  return (
    <div>
      <Carousel {...props.images} />
    </div>
  );
};

export default Resource;
