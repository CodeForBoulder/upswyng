import {
  BananaIcon,
  BusIcon,
  BusinessCenterIcon,
  CallIcon,
  DoorIcon,
  HomeIcon,
  HygieneIcon,
  LocalHospitalIcon,
  PeopleIcon,
  SocksIcon,
  WifiIcon,
} from "./Icons";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import HomeButton from "./HomeButton";
import HomeLink from "./HomeLink";
import React from "react";
import { THomeButtonRouterLink } from "../webTypes";
import { colors } from "@upswyng/common";
import { useTranslation } from "react-i18next";

export const routerLinkButtons: THomeButtonRouterLink[] = [
  {
    text: "Food",
    translationKey: "categories:food",
    icon: BananaIcon,
    linkProps: {
      to: "/food",
    },
    color: colors.gold,
  },
  {
    text: "Shelter",
    translationKey: "categories:shelter",
    icon: HomeIcon,
    linkProps: {
      to: "/shelters",
    },
    color: colors.orangeDark,
  },
  {
    text: "Hygiene",
    translationKey: "categories:hygiene",
    icon: HygieneIcon,
    linkProps: {
      to: "/hygiene",
    },
    color: colors.teal,
  },
  {
    text: "Transit",
    translationKey: "categories:transit",
    icon: BusIcon,
    linkProps: {
      to: "/transit",
    },
    color: colors.green,
  },
  {
    text: "Resources",
    translationKey: "categories:resources",
    icon: SocksIcon,
    linkProps: {
      to: "/resources",
    },
    color: colors.purple,
  },
  {
    text: "Hotlines",
    translationKey: "categories:hotlines",
    icon: CallIcon,
    linkProps: {
      to: "/hotlines",
    },
    color: colors.pink,
  },
  {
    text: "Health",
    translationKey: "categories:health",
    icon: LocalHospitalIcon,
    linkProps: {
      to: "/health",
    },
    color: colors.red,
  },
  {
    text: "Wifi",
    translationKey: "categories:wifi",
    icon: WifiIcon,
    linkProps: {
      to: "/wifi",
    },
    color: colors.blue,
  },
  {
    text: "Job Training",
    translationKey: "categories:jobTraining",
    icon: BusinessCenterIcon,
    linkProps: {
      to: "/job_training",
    },
    color: colors.lavender,
  },
  {
    text: "Social Services",
    translationKey: "categories:socialServices",
    icon: PeopleIcon,
    linkProps: {
      to: "/social_services",
    },
    color: colors.brown,
  },
];

const coordinatedEntryButton: THomeButtonRouterLink = {
  text: "Coordinated Entry",
  translationKey: "glossary:coordinatedEntry",
  icon: DoorIcon,
  linkProps: {
    to: "/coordinated-entry",
  },
  color: colors.rosewood,
};

const HomeButtons = () => {
  const { t } = useTranslation(["categories"]);
  return (
    <Grid
      container
      direction="row"
      justify="space-evenly"
      alignItems="stretch"
      spacing={2}
    >
      {routerLinkButtons.map(button => {
        return (
          <Grid item xs={6} key={button.text}>
            <Box
              alignContent="stretch"
              component={HomeLink}
              display="flex"
              height="100%"
              {...button}
            >
              <HomeButton
                buttonColor={button.color}
                data-test="home-router-button"
              >
                {t(button.translationKey, { defaultValue: button.text })}
                {button.icon}
              </HomeButton>
            </Box>
          </Grid>
        );
      })}
      <Grid item xs={12}>
        <Box
          alignContent="stretch"
          component={HomeLink}
          display="flex"
          height="100%"
          {...coordinatedEntryButton}
        >
          <HomeButton buttonColor={coordinatedEntryButton.color}>
            {t(coordinatedEntryButton.translationKey, {
              defaultValue: coordinatedEntryButton.text,
            })}
            {coordinatedEntryButton.icon}
          </HomeButton>
        </Box>
      </Grid>
    </Grid>
  );
};

export default HomeButtons;
