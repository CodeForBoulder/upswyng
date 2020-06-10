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
import { HomeRouterLink } from "./HomeLink";
import React from "react";
import { THomeButtonRouterLink } from "../webTypes";
import { colors } from "@upswyng/common";

export const routerLinkButtons: THomeButtonRouterLink[] = [
  {
    text: "Food",
    icon: BananaIcon,
    linkProps: {
      to: "/food",
    },
    color: colors.gold,
  },
  {
    text: "Shelter",
    icon: HomeIcon,
    linkProps: {
      to: "/shelters",
    },
    color: colors.orangeDark,
  },
  {
    text: "Hygiene",
    icon: HygieneIcon,
    linkProps: {
      to: "/hygiene",
    },
    color: colors.teal,
  },
  {
    text: "Transit",
    icon: BusIcon,
    linkProps: {
      to: "/transit",
    },
    color: colors.green,
  },
  {
    text: "Resources",
    icon: SocksIcon,
    linkProps: {
      to: "/resources",
    },
    color: colors.purple,
  },
  {
    text: "Hotlines",
    icon: CallIcon,
    linkProps: {
      to: "/hotlines",
    },
    color: colors.pink,
  },
  {
    text: "Health",
    icon: LocalHospitalIcon,
    linkProps: {
      to: "/health",
    },
    color: colors.red,
  },
  {
    text: "Wifi",
    icon: WifiIcon,
    linkProps: {
      to: "/wifi",
    },
    color: colors.blue,
  },
  {
    text: "Job Training",
    icon: BusinessCenterIcon,
    linkProps: {
      to: "/job-training",
    },
    color: colors.lavendar,
  },
  {
    text: "Social Services",
    icon: PeopleIcon,
    linkProps: {
      to: "/social_services",
    },
    color: colors.brown,
  },
];

const coordinatedEntryButton: THomeButtonRouterLink = {
  text: "Coordinated Entry",
  icon: DoorIcon,
  linkProps: {
    to: "/coordinated-entry",
  },
  color: colors.rosewood,
};

const HomeButtons = () => (
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
            component={HomeRouterLink}
            display="flex"
            height="100%"
            {...button}
          >
            <HomeButton
              buttonColor={button.color}
              data-test="home-router-button"
            >
              {button.text}
              {button.icon}
            </HomeButton>
          </Box>
        </Grid>
      );
    })}
    <Grid item xs={12}>
      <Box
        alignContent="stretch"
        component={HomeRouterLink}
        display="flex"
        height="100%"
        {...coordinatedEntryButton}
      >
        <HomeButton buttonColor={coordinatedEntryButton.color}>
          {coordinatedEntryButton.text}
          {coordinatedEntryButton.icon}
        </HomeButton>
      </Box>
    </Grid>
  </Grid>
);

export default HomeButtons;
