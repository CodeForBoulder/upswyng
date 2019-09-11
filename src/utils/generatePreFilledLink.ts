import { TResource } from '../types';

interface TQuestionMap {
  [key: string]: number;
}

const charityDetails: TQuestionMap = {
  category: 1284266761,
  charityname: 1494150320,
  description: 2046501879,
  servicetype: 1330295798
};

const publicContactInfo = {
  address1: 1476826077,
  address2: 924605331,
  city: 357517818,
  phone: 208446925,
  state: 121062456,
  useremail: 1767539604,
  website: 739996235,
  zip: 566189547
};

const questionMap: TQuestionMap = {
  ...charityDetails,
  ...publicContactInfo
};

const baseUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLScr5GdjaHNjRkdWY-MoASJlb1lnH0iM2gm3wuwgX_0ZZqu5Mg/viewform?usp=pp_url';
const questionParamKey = 'entry.';

const modifyQuestionUrlParamValue = (resourceProp: string, value: any) => {
  switch (resourceProp) {
    case 'category':
      return value
        .split(',')
        .join(`&${questionParamKey}${questionMap[resourceProp]}=`);
    default:
      return value;
  }
};

const getQuestionUrlParam = (key: string, value: any) => {
  if (!questionMap[key] || !value) {
    return '';
  }

  const modifiedValue = modifyQuestionUrlParamValue(key, value);

  return `${questionParamKey}${questionMap[key]}=${modifiedValue}`;
};

const generatePreFilledLink = (resource: TResource) => {
  console.log(resource);
  const urlParams = Object.entries(questionMap).map(([resourceProp]) =>
    getQuestionUrlParam(resourceProp, resource[resourceProp])
  );

  return `${baseUrl}&${urlParams.join('&')}`;
};

export default generatePreFilledLink;

// const schedules = {
//   closeschedule: TCloseSchedule[];
//   schedule: TSchedule[];
// }

// //NOT IN DB

// const contactPersonInfo = {
//   contactPersonName: 2033960682,
//   contactPersonPhone: 1972742378,
//   contactPersonEmail: 14414236,
// };

// const socialMediaLinks = {
//   facebook: 1792737995,
//   instagram: 1965878317,
//   twitter: 223349880,
// }

// const UNUSED = {
//   lat: number,
//   lng: number,
//   selectedAll: boolean,
//   showflag: boolean,
//   updateshelter: string,
//   userid: string,
// }

// const categoryQuestionMap = {
//   food: {
//     id: 339162976,
//     subCategories: [
//       'food pantry',
//       'meals',
//     ],
//   },
//   health: {
//     id: 692757337,
//     subCategories: [
//       'addiction recovery services',
//       'clinic',
//       'dental',
//       'hospital',
//       'mental',
//       'pharmacy',
//       'vision',
//     ],
//   },
// };

// entry.1957797771=what+should+clients+know+before+using+service?

// entry.1777246851=weekly

// entry.339162976.other_option_response=food+other

// entry.692757337=Addiction+Recovery+Services
// entry.692757337=Clinic
// entry.692757337=Dental
// entry.692757337=Hospital
// entry.692757337=Mental
// entry.692757337=Pharmacy
// entry.692757337=Vision
// entry.692757337=__other_option__
// entry.692757337.other_option_response=health+other

// entry.163376122=Feminine+Products
// entry.163376122=Water+Fountains
// entry.163376122=Showers
// entry.163376122=Restrooms
// entry.163376122=__other_option__
// entry.163376122.other_option_response=hygiene+other

// entry.287762356=Craigs+List
// entry.287762356=Temp+Agency
// entry.287762356=Day+Labor
// entry.287762356=Ready+to+Work
// entry.287762356=Career+Counseling
// entry.287762356=__other_option__
// entry.287762356.other_option_response=job+training+other

// entry.2146328654=Pet+Resources
// entry.2146328654=Hair+Care
// entry.2146328654=Laundry
// entry.2146328654=Legal+Help
// entry.2146328654=Outdoor+Gear
// entry.2146328654=Home+Goods
// entry.2146328654=Shoes
// entry.2146328654=Clothing
// entry.2146328654=__other_option__

// entry.2146328654.other_option_response=resources+other
// entry.1736089063=Shelter+for+pregnant+individuals
// entry.1736089063=Shelter+for+abused+individuals
// entry.1736089063=Shelter+for+youth
// entry.1736089063=Shelter+for+families
// entry.1736089063=Transitional+Shelter
// entry.1736089063=Temporary+Shelter
// entry.1736089063=Emergency+Shelter
// entry.1736089063=__other_option__
// entry.1736089063.other_option_response=shelters+other

// entry.757691226=Social+Security
// entry.757691226=Health+and+Human+Services
// entry.757691226=Food+Stamps
// entry.757691226=__other_option__
// entry.757691226.other_option_response=social+services+other

// entry.656504316=Bus
// entry.656504316=Bicycle
// entry.656504316=Lite+Rail
// entry.656504316=__other_option__
// entry.656504316.other_option_response=transit+other

// entry.239744685=Free+Wifi
// entry.239744685=Public+Computers
// entry.239744685=Charging+Stations
// entry.239744685=__other_option__
// entry.239744685.other_option_response=wifi+other
