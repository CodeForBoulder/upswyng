import React from 'react';
import { TResourceCategory } from '../types';
import { colors, Container } from '../App.styles';
import {
  BananaIcon,
  BusIcon,
  BusinessCenterIcon,
  HomeIcon,
  HygieneIcon,
  LocalHospitalIcon,
  PeopleIcon,
  SocksIcon,
  WifiIcon
} from './Icons';
import CategoryResults from './CategoryResults';

interface TCategory {
  color: keyof typeof colors;
  placeholder: React.ReactElement;
  mainCategory: TResourceCategory;
  subCategories: TResourceCategory[];
}

type TCategoryName =
  | 'Food'
  | 'Health'
  | 'Hygiene'
  | 'JobTraining'
  | 'Resources'
  | 'Shelters'
  | 'SocialServices'
  | 'Transit'
  | 'Wifi';

const categories: Record<TCategoryName, TCategory> = {
  Food: {
    color: 'gold',
    placeholder: BananaIcon,
    mainCategory: {
      text: 'Food',
      query: 'CATEGORY-food'
    },
    subCategories: [
      {
        text: 'Meals',
        query: 'SUBCATEGORY-food-meal'
      },
      {
        text: 'Food Pantries',
        query: 'SUBCATEGORY-food-pantry'
      }
    ]
  },
  Health: {
    color: 'red',
    placeholder: LocalHospitalIcon,
    mainCategory: {
      text: 'Health',
      query: 'CATEGORY-health'
    },
    subCategories: [
      {
        text: 'Hospital',
        query: 'SUBCATEGORY-health-hospital'
      },
      {
        text: 'Clinics',
        query: 'SUBCATEGORY-health-clinic'
      },
      {
        text: 'Mental',
        query: 'SUBCATEGORY-health-mental'
      },
      {
        text: 'Dental',
        query: 'SUBCATEGORY-health-dental'
      },
      {
        text: 'Pharmacies',
        query: 'SUBCATEGORY-health-pharmacy'
      },
      {
        text: 'Vision',
        query: 'SUBCATEGORY-health-vision'
      },
      {
        text: 'Addiction',
        query: 'SUBCATEGORY-health-addictionRecoveryServices'
      }
    ]
  },
  Hygiene: {
    color: 'teal',
    placeholder: HygieneIcon,
    mainCategory: {
      text: 'Hygiene',
      query: 'CATEGORY-hygiene'
    },
    subCategories: [
      {
        text: 'Restrooms',
        query: 'SUBCATEGORY-hygiene-bathroom'
      },
      {
        text: 'Showers',
        query: 'SUBCATEGORY-hygiene-shower'
      },
      {
        text: 'Water Fountains',
        query: 'SUBCATEGORY-hygiene-water'
      },
      {
        text: 'Feminine Products',
        query: 'SUBCATEGORY-hygiene-feminine'
      }
    ]
  },
  JobTraining: {
    color: 'lavendar',
    placeholder: BusinessCenterIcon,
    mainCategory: {
      text: 'Job Training',
      query: 'CATEGORY-jobTraining'
    },
    subCategories: [
      {
        text: 'Ready to Work',
        query: 'SUBCATEGORY-jobTraining-readyToWork'
      },
      {
        text: 'Craigs List',
        query: 'SUBCATEGORY-jobTraining-craigsList'
      },
      {
        text: 'Temp Agency',
        query: 'SUBCATEGORY-jobTraining-tempAgency'
      },
      {
        text: 'Day Labor',
        query: 'SUBCATEGORY-jobTraining-dayLabor'
      },
      {
        text: 'Career Counseling',
        query: 'SUBCATEGORY-jobTraining-careerCounseling'
      }
    ]
  },
  Resources: {
    color: 'purple',
    placeholder: SocksIcon,
    mainCategory: {
      text: 'Resources',
      query: 'CATEGORY-resources'
    },
    subCategories: [
      {
        text: 'Outdoor Gear',
        query: 'SUBCATEGORY-resources-outdoorGear'
      },
      {
        text: 'Clothing',
        query: 'SUBCATEGORY-resources-clothing'
      },
      {
        text: 'Shoes',
        query: 'SUBCATEGORY-resources-shoes'
      },
      {
        text: 'Legal Help',
        query: 'SUBCATEGORY-resources-legalHelp'
      },
      {
        text: 'Pets',
        query: 'SUBCATEGORY-resources-pets'
      },
      {
        text: 'Laundry',
        query: 'SUBCATEGORY-resources-laundry'
      },
      {
        text: 'Hair Care',
        query: 'SUBCATEGORY-resources-hairCare'
      },
      {
        text: 'Home Goods',
        query: 'SUBCATEGORY-resources-homeGoods'
      }
    ]
  },
  Shelters: {
    color: 'orangePrimary',
    placeholder: HomeIcon,
    mainCategory: {
      text: 'Shelter',
      query: 'CATEGORY-shelter'
    },
    subCategories: [
      {
        text: 'Emergency',
        query: 'SUBCATEGORY-shelter-emergency'
      },
      {
        text: 'Family',
        query: 'SUBCATEGORY-shelter-family'
      },
      {
        text: 'Youth',
        query: 'SUBCATEGORY-shelter-youth'
      },
      {
        text: 'Abused',
        query: 'SUBCATEGORY-shelter-abused'
      },
      {
        text: 'Pregnant',
        query: 'SUBCATEGORY-shelter-pregnant'
      },
      {
        text: 'Temporary',
        query: 'SUBCATEGORY-shelter-temporary'
      },
      {
        text: 'Transitional',
        query: 'SUBCATEGORY-shelter-transitional'
      }
    ]
  },
  SocialServices: {
    color: 'brown',
    placeholder: PeopleIcon,
    mainCategory: {
      text: 'Social Services',
      query: 'CATEGORY-socialServices'
    },
    subCategories: [
      {
        text: 'Health and Human Services',
        query: 'SUBCATEGORY-socialServices-healthAndHumanServices'
      },
      {
        text: 'Food Stamps',
        query: 'SUBCATEGORY-socialServices-foodStamps'
      },
      {
        text: 'Social Security',
        query: 'SUBCATEGORY-socialServices-socialSecurity'
      }
    ]
  },
  Transit: {
    color: 'green',
    placeholder: BusIcon,
    mainCategory: {
      text: 'Transit',
      query: 'CATEGORY-transit'
    },
    subCategories: [
      {
        text: 'Bus',
        query: 'SUBCATEGORY-transit-bus'
      },
      {
        text: 'Bicycle',
        query: 'SUBCATEGORY-transit-bicycle'
      },
      {
        text: 'Lite Rail',
        query: 'SUBCATEGORY-transit-liteRail'
      }
    ]
  },
  Wifi: {
    color: 'blue',
    placeholder: WifiIcon,
    mainCategory: {
      text: 'Wifi',
      query: 'CATEGORY-wifi'
    },
    subCategories: [
      {
        text: 'Free Wifi',
        query: 'SUBCATEGORY-wifi-freeWifi'
      },
      {
        text: 'Public Computer',
        query: 'SUBCATEGORY-wifi-publicComputer'
      },
      {
        text: 'Charging',
        query: 'SUBCATEGORY-wifi-charging'
      }
    ]
  }
};

export default Object.entries(categories).reduce(
  (result, [categoryName, categoryValue]) => ({
    ...result,
    [categoryName]: () => (
      <Container>
        <CategoryResults
          category={categoryValue.mainCategory}
          color={colors[categoryValue.color]}
          placeholder={categoryValue.placeholder}
          subCategories={categoryValue.subCategories}
        />
      </Container>
    )
  }),
  // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
  {} as Record<TCategoryName, React.FunctionComponent<{}>>
);
