import { TCategoryQuestionMap, TQuestionMap } from '../../types';

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

export const categoryQuestionMaps = {
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

const charityDetails: TQuestionMap = {
  id: 867253131,
  category: 1284266761,
  charityname: 1494150320,
  description: 2046501879,
  servicetype: 1330295798
};

const publicContactInfo: TQuestionMap = {
  address1: 1476826077,
  address2: 924605331,
  city: 357517818,
  phone: 208446925,
  state: 121062456,
  useremail: 1767539604,
  website: 739996235,
  zip: 566189547
};

export const questionMap: TQuestionMap = {
  ...charityDetails,
  ...publicContactInfo
};
