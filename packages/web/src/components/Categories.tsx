import {
  BananaIcon,
  BusIcon,
  BusinessCenterIcon,
  HomeIcon,
  HygieneIcon,
  LocalHospitalIcon,
  PeopleIcon,
  SocksIcon,
  WifiIcon,
} from "./Icons";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { TResourceCategory, TResourceSubcategory } from "../webTypes";
import CategoryResults from "./CategoryResults";
import Container from "@material-ui/core/Container";
import React from "react";
import { colors } from "@upswyng/common";

export interface TCategoryDefinition {
  color: keyof typeof colors;
  placeholder: React.ReactElement;
  mainCategory: TResourceCategory;
  subCategories: TResourceSubcategory[];
}

type TCategoryName =
  | "Food"
  | "Health"
  | "Hygiene"
  | "JobTraining"
  | "Resources"
  | "Shelters"
  | "SocialServices"
  | "Transit"
  | "Wifi";

// TODO: Fetch this from the server
export const categories: Record<TCategoryName, TCategoryDefinition> = {
  Food: {
    color: "gold",
    placeholder: BananaIcon,
    mainCategory: {
      text: "Food",
      stub: "food",
    },
    subCategories: [
      {
        text: "Meals",
        stub: "meals",
      },
      {
        text: "Food Pantries",
        stub: "food_pantries",
      },
    ],
  },
  Health: {
    color: "red",
    placeholder: LocalHospitalIcon,
    mainCategory: {
      text: "Health",
      stub: "health",
    },
    subCategories: [
      {
        text: "Hospital",
        stub: "hospital",
      },
      {
        text: "Clinics",
        stub: "clinics",
      },
      {
        text: "Mental",
        stub: "mental",
      },
      {
        text: "Dental",
        stub: "dental",
      },
      {
        text: "Pharmacies",
        stub: "pharmacies",
      },
      {
        text: "Vision",
        stub: "vision",
      },
      {
        text: "Addiction",
        stub: "addiction_recovery_services",
      },
    ],
  },
  Hygiene: {
    color: "teal",
    placeholder: HygieneIcon,
    mainCategory: {
      text: "Hygiene",
      stub: "hygiene",
    },
    subCategories: [
      {
        text: "Restrooms",
        stub: "restrooms",
      },
      {
        text: "Showers",
        stub: "showers",
      },
      {
        text: "Water Fountains",
        stub: "water_fountains",
      },
      {
        text: "Feminine Products",
        stub: "feminine_products",
      },
    ],
  },
  JobTraining: {
    color: "lavendar",
    placeholder: BusinessCenterIcon,
    mainCategory: {
      text: "Job Training",
      stub: "job_training",
    },
    subCategories: [
      {
        text: "Ready to Work",
        stub: "ready_to_work",
      },
      {
        text: "Craigs List",
        stub: "craigslist",
      },
      {
        text: "Temp Agency",
        stub: "temp_agency",
      },
      {
        text: "Career Counseling",
        stub: "career_counseling",
      },
    ],
  },
  Resources: {
    color: "purple",
    placeholder: SocksIcon,
    mainCategory: {
      text: "Resources",
      stub: "resources",
    },
    subCategories: [
      {
        text: "Outdoor Gear",
        stub: "outdoor_gear",
      },
      {
        text: "Clothing",
        stub: "clothing",
      },
      {
        text: "Shoes",
        stub: "shoes",
      },
      {
        text: "Legal Help",
        stub: "legal_help",
      },
      {
        text: "Pets",
        stub: "pets",
      },
      {
        text: "Laundry",
        stub: "laundry",
      },
      {
        text: "Hair Care",
        stub: "hair_care",
      },
      {
        text: "Home Goods",
        stub: "home_goods",
      },
    ],
  },
  Shelters: {
    color: "orangePrimary",
    placeholder: HomeIcon,
    mainCategory: {
      text: "Shelter",
      stub: "shelters",
    },
    subCategories: [
      {
        text: "Emergency",
        stub: "emergency",
      },
      {
        text: "Family",
        stub: "family",
      },
      {
        text: "Youth",
        stub: "youth",
      },
      {
        text: "Abused",
        stub: "abused",
      },
      {
        text: "Safe Parking",
        stub: "safe-parking",
      },
      {
        text: "Pregnant",
        stub: "pregnant",
      },
      {
        text: "Temporary",
        stub: "temporary",
      },
      {
        text: "Transitional",
        stub: "transitional",
      },
    ],
  },
  SocialServices: {
    color: "brown",
    placeholder: PeopleIcon,
    mainCategory: {
      text: "Social Services",
      stub: "social_services",
    },
    subCategories: [
      {
        text: "Health and Human Services",
        stub: "health_and_human_services",
      },
      {
        text: "Food Stamps",
        stub: "food_stamps",
      },
      {
        text: "Social Security",
        stub: "social_security",
      },
    ],
  },
  Transit: {
    color: "green",
    placeholder: BusIcon,
    mainCategory: {
      text: "Transit",
      stub: "transit",
    },
    subCategories: [
      {
        text: "Bus Passes",
        stub: "bus_passes",
      },
      {
        text: "Bicycle",
        stub: "bicycle",
      },
    ],
  },
  Wifi: {
    color: "blue",
    placeholder: WifiIcon,
    mainCategory: {
      text: "Wifi",
      stub: "wifi",
    },
    subCategories: [
      {
        text: "Free Wifi",
        stub: "free_wifi",
      },
      {
        text: "Public Computer",
        stub: "public_computer",
      },
      {
        text: "Charging",
        stub: "charging",
      },
    ],
  },
};

export default Object.entries(categories).reduce(
  (result, [categoryName, categoryValue]) => ({
    ...result,
    [categoryName]: () => {
      const routeMatch = useRouteMatch();
      const path = routeMatch ? routeMatch.path : "";

      return (
        <Switch>
          <Route exact path={`${path}`}>
            <Container>
              <CategoryResults
                category={categoryValue.mainCategory}
                color={colors[categoryValue.color]}
                placeholder={categoryValue.placeholder}
                subCategories={categoryValue.subCategories}
              />
            </Container>
          </Route>
          <Route path={`${path}/:subcategory`}>
            <Container>
              <CategoryResults
                category={categoryValue.mainCategory}
                color={colors[categoryValue.color]}
                placeholder={categoryValue.placeholder}
                subCategories={categoryValue.subCategories}
              />
            </Container>
          </Route>
        </Switch>
      );
    },
  }),
  // eslint-disable-next-line
  {} as Record<TCategoryName, React.FunctionComponent<{}>>
);
