import {
  TResource,
  TUpswyngResource,
  TFirebaseTimestamp,
  TSchedule
} from '../types';

function convertStrappedDateToFirebaseTimestamp(
  date: string
): TFirebaseTimestamp {
  const jsDate = new Date(date);
  const secondsStamp: number =
    jsDate instanceof Date &&
    !isNaN(jsDate.getTime()) /* tests for valid date */
      ? Math.round(jsDate.getTime() / 1000)
      : 0;
  return { _seconds: secondsStamp, _nanoseconds: 0 };
}

function convertResource(charity: TResource): TUpswyngResource {
  return {
    address: {
      address1: charity.address1,
      address2: charity.address2,
      city: charity.city,
      state: charity.state,
      zip: charity.zip
    },
    category: charity.category,
    name: charity.charityname,
    closeSchedule: charity.closeschedule,
    description: charity.description,
    isApproved: !!charity.approved,
    kudos: charity.kudos,
    location: {
      _latitude: charity.lat,
      _longitude: charity.lng
    },
    phone: charity.phone,
    schedule: (charity.schedule || []).map((s: TSchedule) => ({
      day: s.day,
      from: s.fromstring,
      to: s.tostring,
      type: s.type
    })),
    selectedAll: charity.selectedAll,
    serviceType: charity.service,
    serviceSubtype: charity.servicetype,
    shouldShow: charity.showflag,
    updateDate: convertStrappedDateToFirebaseTimestamp(charity.updateshelter),
    user: {
      email: charity.useremail,
      id: charity.userid
    },
    websiteUrl: charity.website
  };
}

// using module export pattern since this is used in a script which doesn't understand es6
module.exports = { convertResource };
