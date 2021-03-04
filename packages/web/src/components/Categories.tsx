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
      translationKey: "food",
      stub: "food",
    },
    subCategories: [
      {
        translationKey: "meals",
        stub: "meals",
      },
      {
        translationKey: "foodPantries",
        stub: "food_pantries",
      },
    ],
  },
  Health: {
    color: "red",
    placeholder: LocalHospitalIcon,
    mainCategory: {
      translationKey: "health",
      stub: "health",
    },
    subCategories: [
      {
        translationKey: "hospital",
        stub: "hospital",
      },
      {
        translationKey: "clinics",
        stub: "clinics",
      },
      {
        translationKey: "mental",
        stub: "mental",
      },
      {
        translationKey: "dental",
        stub: "dental",
      },
      {
        translationKey: "pharmacies",
        stub: "pharmacies",
      },
      {
        translationKey: "vision",
        stub: "vision",
      },
      {
        translationKey: "addiction",
        stub: "addiction_recovery_services",
      },
    ],
  },
  Hygiene: {
    color: "teal",
    placeholder: HygieneIcon,
    mainCategory: {
      translationKey: "hygiene",
      stub: "hygiene",
    },
    subCategories: [
      {
        translationKey: "restrooms",
        stub: "restrooms",
      },
      {
        translationKey: "showers",
        stub: "showers",
      },
      {
        translationKey: "waterFountains",
        stub: "water_fountains",
      },
      {
        translationKey: "feminineProducts",
        stub: "feminine_products",
      },
    ],
  },
  JobTraining: {
    color: "lavendar",
    placeholder: BusinessCenterIcon,
    mainCategory: {
      translationKey: "jobTraining",
      stub: "job_training",
    },
    subCategories: [
      {
        translationKey: "readyToWork",
        stub: "ready_to_work",
      },
      {
        translationKey: "craigsList",
        stub: "craigslist",
      },
      {
        translationKey: "tempAgency",
        stub: "temp_agency",
      },
      {
        translationKey: "careerCounseling",
        stub: "career_counseling",
      },
    ],
  },
  Resources: {
    color: "purple",
    placeholder: SocksIcon,
    mainCategory: {
      translationKey: "resources",
      stub: "resources",
    },
    subCategories: [
      {
        translationKey: "outdoorGear",
        stub: "outdoor_gear",
      },
      {
        translationKey: "clothing",
        stub: "clothing",
      },
      {
        translationKey: "shoes",
        stub: "shoes",
      },
      {
        translationKey: "legalHelp",
        stub: "legal_help",
      },
      {
        translationKey: "pets",
        stub: "pets",
      },
      {
        translationKey: "laundry",
        stub: "laundry",
      },
      {
        translationKey: "hairCare",
        stub: "hair_care",
      },
      {
        translationKey: "homeGoods",
        stub: "home_goods",
      },
    ],
  },
  Shelters: {
    color: "orangePrimary",
    placeholder: HomeIcon,
    mainCategory: {
      translationKey: "shelter",
      stub: "shelters",
    },
    subCategories: [
      {
        translationKey: "emergency",
        stub: "emergency",
      },
      {
        translationKey: "family",
        stub: "family",
      },
      {
        translationKey: "youth",
        stub: "youth",
      },
      {
        translationKey: "abused",
        stub: "abused",
      },
      {
        translationKey: "safeParking",
        stub: "safe-parking",
      },
      {
        translationKey: "pregnant",
        stub: "pregnant",
      },
      {
        translationKey: "temporary",
        stub: "temporary",
      },
      {
        translationKey: "transitional",
        stub: "transitional",
      },
    ],
  },
  SocialServices: {
    color: "brown",
    placeholder: PeopleIcon,
    mainCategory: {
      translationKey: "socialServices",
      stub: "social_services",
    },
    subCategories: [
      {
        translationKey: "healthAndHumanServices",
        stub: "health_and_human_services",
      },
      {
        translationKey: "foodStamps",
        stub: "food_stamps",
      },
      {
        translationKey: "socialSecurity",
        stub: "social_security",
      },
    ],
  },
  Transit: {
    color: "green",
    placeholder: BusIcon,
    mainCategory: {
      translationKey: "transit",
      stub: "transit",
    },
    subCategories: [
      {
        translationKey: "busPasses",
        stub: "bus_passes",
      },
      {
        translationKey: "bicycle",
        stub: "bicycle",
      },
    ],
  },
  Wifi: {
    color: "blue",
    placeholder: WifiIcon,
    mainCategory: {
      translationKey: "wifi",
      stub: "wifi",
    },
    subCategories: [
      {
        translationKey: "freeWifi",
        stub: "free_wifi",
      },
      {
        translationKey: "publicComputer",
        stub: "public_computer",
      },
      {
        translationKey: "charging",
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
