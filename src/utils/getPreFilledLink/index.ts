import { TResource } from '../../types';

interface TCategoryQuestionValue {
  value: string;
  synonyms: string[];
}
interface TCategoryQuestionMap {
  questionNum: number;
  values: TCategoryQuestionValue[];
  [key: string]: number | TCategoryQuestionValue[];
}

const foodCategoryQuestionMap: TCategoryQuestionMap = {
  questionNum: 339162976,
  values: [
    {
      value: 'Food Pantry',
      synonyms: ['pantry', 'food share', 'food co-op', 'market']
    },
    {
      value: 'Meals',
      synonyms: [
        'meal',
        'breakfast',
        'lunch',
        'dinner',
        'supper',
        'soup kitchen'
      ]
    }
  ]
};

const healthCategoryQuestionMap: TCategoryQuestionMap = {
  questionNum: 692757337,
  values: [
    {
      value: 'Addiction Recovery Services',
      synonyms: ['addict', 'recover']
    },
    {
      value: 'Clinic',
      synonyms: [
        'clinic',
        'general med',
        'general practice',
        'doctor',
        'nurse',
        'physical',
        'checkup',
        'check-up'
      ]
    },
    {
      value: 'Dental',
      synonyms: ['dental', 'dentist', 'tooth', 'teeth', 'emergency']
    },
    {
      value: 'Hospital',
      synonyms: [
        'hospital',
        'urgent care',
        'doctor',
        'nurse',
        'emergency',
        'emt',
        'trauma'
      ]
    },
    {
      value: 'Mental',
      synonyms: ['mental', 'therapy', 'therapies', 'mind', 'mindful']
    },
    {
      value: 'Pharmacy',
      synonyms: ['pharmacy', 'pharmacies', 'prescription', 'medicine']
    },
    {
      value: 'Vision',
      synonyms: [
        'vision',
        'optometry',
        'optometrist',
        'eye',
        'glasses',
        'contacts'
      ]
    }
  ]
};

const hygieneQuestionMap: TCategoryQuestionMap = {
  questionNum: 163376122,
  values: [
    {
      value: 'Feminine Products',
      synonyms: ['feminine products', 'feminine', 'female', 'tampon']
    },
    {
      value: 'Water Fountains',
      synonyms: ['water', 'bottle', 'portable']
    },
    {
      value: 'Showers',
      synonyms: ['shower']
    },
    {
      value: 'Restrooms',
      synonyms: ['bathroom', 'restroom', 'toilet', 'water closet', 'sink']
    }
  ]
};

const jobTrainingQuestionMap: TCategoryQuestionMap = {
  questionNum: 287762356,
  values: [
    {
      value: 'Craigs List',
      synonyms: ['craigs list', 'job list']
    },
    {
      value: 'Temp Agency',
      synonyms: [
        'temp agency',
        'temporary work',
        'temporary agency',
        'temp work'
      ]
    },
    {
      value: 'Day Labor',
      synonyms: ['day labor', 'labor']
    },
    {
      value: 'Ready to Work',
      synonyms: ['ready to work']
    },
    {
      value: 'Career Counseling',
      synonyms: ['career counseling', 'career counsel', 'career advice']
    }
  ]
};

const resourcesQuestionMap: TCategoryQuestionMap = {
  questionNum: 2146328654,
  values: [
    {
      value: 'Pet Resources',
      synonyms: [
        'pets',
        'pet food',
        'pet supplies',
        'vet',
        'veterinary',
        'veterinarian',
        'parks',
        'dog',
        'cat',
        'animal'
      ]
    },
    {
      value: 'Hair Care',
      synonyms: [
        'hair care',
        'hair',
        'hair cut',
        'haircut',
        'shampoo',
        'conditioner',
        'barber',
        'hairdresser',
        'salon'
      ]
    },
    {
      value: 'Laundry',
      synonyms: ['laundry', 'washer', 'dryer', 'laundromat', 'clean cloth']
    },
    {
      value: 'Legal Help',
      synonyms: [
        'legal help',
        'legal',
        'criminal',
        'civil',
        'crime',
        'lawyer',
        'law',
        'paralegal',
        'custody'
      ]
    },
    {
      value: 'Outdoor Gear',
      synonyms: [
        'outdoor gear',
        'tent',
        'sleeping bag',
        'sleeping pad',
        'rain gear',
        'coat',
        'backpack',
        'pack',
        'boot'
      ]
    },
    {
      value: 'Home Goods',
      synonyms: [
        'home goods',
        'pot',
        'pan',
        'silverwear',
        'silver wear',
        'utensil',
        'bedding',
        'mattress',
        'plate',
        'dish',
        'bowl',
        'hanger',
        'furniture'
      ]
    },
    {
      value: 'Shoes',
      synonyms: ['shoe', 'boot', 'sandal']
    },
    {
      value: 'Clothing',
      synonyms: [
        'clothing',
        'clothes',
        'jacket',
        'coat',
        'hat',
        'glove',
        'rain gear',
        'sock',
        'snow gear',
        'waterproof',
        'water proof',
        'sunglasses',
        'scarf',
        'bottle',
        'mug',
        'thermos'
      ]
    }
  ]
};

const shelterQuestionMap: TCategoryQuestionMap = {
  questionNum: 1736089063,
  values: [
    {
      value: 'Shelter for pregnant individuals',
      synonyms: [
        'pregnant women shelter',
        'pregnant',
        'pregnancy',
        'safe place',
        'harass'
      ]
    },
    {
      value: 'Shelter for abused individuals',
      synonyms: [
        'abused shelter',
        'abused',
        'beaten',
        'battered',
        'verbal abuse',
        'abuse',
        'hate crime',
        'hate act',
        'safe place',
        'harass'
      ]
    },
    {
      value: 'Shelter for youth',
      synonyms: [
        'youth shelter',
        'underage',
        'youth',
        'runaway',
        'lgbtq',
        'safe place',
        'harass'
      ]
    },
    {
      value: 'Shelter for families',
      synonyms: [
        'family shelter',
        'safe place',
        'harass',
        'families',
        'children shelter',
        'married shelter'
      ]
    },
    {
      value: 'Transitional Shelter',
      synonyms: [
        'safe place',
        'harass',
        'transitional shelter',
        'transitional housing'
      ]
    },
    {
      value: 'Temporary Shelter',
      synonyms: [
        'temporary shelter',
        'safe place',
        'harass',
        'community shelter',
        'pod share'
      ]
    },
    {
      value: 'Emergency Shelter',
      synonyms: [
        'emergency',
        'emergency shelter',
        'safe place',
        'harass',
        'emergency',
        'overflow',
        'severe weather'
      ]
    }
  ]
};

const socialServicesQuestionMap: TCategoryQuestionMap = {
  questionNum: 757691226,
  values: [
    {
      value: 'Social Security',
      synonyms: ['social security']
    },
    {
      value: 'Health and Human Services',
      synonyms: [
        'health and human services',
        'leap',
        'utility assistance',
        'food stamp',
        'food stamps'
      ]
    },
    {
      value: 'Food Stamps',
      synonyms: ['food stamps', 'food stamp', 'snap']
    }
  ]
};

const transitQuestionMap: TCategoryQuestionMap = {
  questionNum: 656504316,
  values: [
    {
      value: 'Bus',
      synonyms: ['bus', 'rtd', 'bus schedule', 'bus ticket', 'flex']
    },
    {
      value: 'Bicycle',
      synonyms: [
        'bicycle rental',
        'bike',
        'bicycle',
        'bike rental',
        'cycle',
        'bike shop',
        'bicycle shop'
      ]
    },
    {
      value: 'Lite Rail',
      synonyms: ['lite rail', 'train', 'subway', 'rail']
    }
  ]
};

const wifiQuestionMap: TCategoryQuestionMap = {
  questionNum: 239744685,
  values: [
    {
      value: 'Free Wifi',
      synonyms: [
        'free wifi',
        'wifi',
        'open wifi',
        'boulder wifi',
        'city wifi',
        'public wifi'
      ]
    },
    {
      value: 'Public Computers',
      synonyms: [
        'public computer',
        'public computers',
        'library computer',
        'library computers',
        'school computer',
        'school computers',
        'internet cafe'
      ]
    },
    {
      value: 'Charging Stations',
      synonyms: [
        'charging station',
        'charge',
        'charging',
        'charging location',
        'charge phone',
        'power',
        'power station',
        'power location',
        'outlet',
        'outlets',
        'usb'
      ]
    }
  ]
};

const categoryQuestionMap = {
  food: foodCategoryQuestionMap,
  health: healthCategoryQuestionMap,
  hygiene: hygieneQuestionMap,
  jobTraining: jobTrainingQuestionMap,
  resources: resourcesQuestionMap,
  shelter: shelterQuestionMap,
  socialServices: socialServicesQuestionMap,
  transit: transitQuestionMap,
  wifi: wifiQuestionMap
};

// the number value refers to which Google form question number the corresponding resource property maps to
interface TQuestionMap {
  [key: string]: number | TCategoryQuestionMap;
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

const getCategoryQuestionUrlParam = (
  categoryQuestionMap: TCategoryQuestionMap,
  resource: TResource
) => {
  const { questionNum, values } = categoryQuestionMap;
  const { charityname, description, servicetype } = resource;

  const matchedValues = values.filter(({ synonyms }) =>
    synonyms.find(synonym => {
      const lowerCaseSynonym = synonym.toLowerCase();
      return (
        charityname.toLowerCase().includes(lowerCaseSynonym) ||
        description.toLowerCase().includes(lowerCaseSynonym) ||
        servicetype.toLowerCase().includes(lowerCaseSynonym)
      );
    })
  );

  if (matchedValues.length) {
    const combinedValues = matchedValues
      .map(({ value }) => value)
      .join(`&${questionParamKey}${questionNum}=`);

    return `&${questionParamKey}${questionNum}=${combinedValues}`;
  }

  return '';
};

const getQuestionUrlParam = (questionKey: string, resource: TResource) => {
  let modifiedValue;
  switch (questionKey) {
    case 'category':
      modifiedValue = resource[questionKey]
        .split(',')
        .join(`&${questionParamKey}${questionMap[questionKey]}=`);
      break;
    default:
      modifiedValue =
        resource[questionKey] !== undefined
          ? encodeURIComponent(`${resource[questionKey]}`)
          : '';
  }

  if (modifiedValue) {
    const questionNum = questionMap[questionKey];

    return `${questionParamKey}${questionNum}=${modifiedValue}`;
  }

  return '';
};

const generatePreFilledLink = (resource: TResource) => {
  const questionUrlParams = Object.entries(questionMap)
    .map(([resourceProp]) => getQuestionUrlParam(resourceProp, resource))
    .filter(value => value)
    .join('&');
  const categoryQuestionUrlParams = Object.entries(categoryQuestionMap)
    .map(([_, categoryMap]) =>
      getCategoryQuestionUrlParam(categoryMap, resource)
    )
    .filter(value => value)
    .join('');

  return `${baseUrl}&${questionUrlParams}${categoryQuestionUrlParams}`;
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

// entry.1957797771=what+should+clients+know+before+using+service?

// entry.1777246851=weekly

// entry.339162976=__other_option__
// entry.339162976.other_option_response=food+other

// entry.692757337=__other_option__
// entry.692757337.other_option_response=health+other

// entry.163376122=__other_option__
// entry.163376122.other_option_response=hygiene+other

// entry.287762356=__other_option__
// entry.287762356.other_option_response=job+training+other

// entry.2146328654=__other_option__
// entry.2146328654.other_option_response=job+training+other

// entry.2146328654=__other_option__
// entry.2146328654.other_option_response=resources+other

// entry.1736089063=__other_option__
// entry.1736089063.other_option_response=shelters+other

// entry.757691226=__other_option__
// entry.757691226.other_option_response=social+services+other

// entry.656504316=__other_option__
// entry.656504316.other_option_response=transit+other

// entry.239744685=__other_option__
// entry.239744685.other_option_response=wifi+other
