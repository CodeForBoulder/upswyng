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
import { Grid } from "@material-ui/core";
import HomeButton from "./HomeButton";
import { HomeRouterLink } from "./HomeLink";
import React from "react";
import { THomeButtonRouterLink } from "../webTypes";
import { colors } from "../App.styles";
import styled from "styled-components";

const routerLinkButtons: THomeButtonRouterLink[] = [
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
      to: "/job_training",
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

const HomeButtonContainer = styled(Grid)`
  display: flex;
  alignitems: stretch;
` as typeof Grid;

const HomeButtons = () => (
  <>
    {routerLinkButtons.map(button => {
      return (
        <HomeButtonContainer item xs={6} key={button.text}>
          <HomeRouterLink {...button}>
            <HomeButton buttonColor={button.color}>
              {button.text}
              {button.icon}
            </HomeButton>
          </HomeRouterLink>
        </HomeButtonContainer>
      );
    })}{" "}
    <Grid item xs={12}>
      <HomeRouterLink
        {...coordinatedEntryButton}
        key={coordinatedEntryButton.text}
      >
        <HomeButton buttonColor={coordinatedEntryButton.color}>
          {coordinatedEntryButton.text}
          {coordinatedEntryButton.icon}
        </HomeButton>
      </HomeRouterLink>
    </Grid>
  </>
);

export default HomeButtons;
