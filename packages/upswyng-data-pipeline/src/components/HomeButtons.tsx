import React from "react";
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
import { THomeButtonAnchor, THomeButtonRouterLink } from "../types";
import { HomeRouterLink, HomeAnchorLink } from "./HomeLink";
import HomeButton from "./HomeButton";
import { colors } from "../App.styles";
import { StyleSheet } from "react-native";

import Grid from "react-native-grid-component";
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
      to: "/job-training",
    },
    color: colors.lavendar,
  },
  {
    text: "Social Services",
    icon: PeopleIcon,
    linkProps: {
      to: "/social-services",
    },
    color: colors.brown,
  },
];

// const coordinatedEntryButton: THomeButtonAnchor = {
//   text: "Coordinated Entry",
//   href: "https://www.bouldercounty.org/homeless/",
//   icon: DoorIcon,
//   color: colors.rosewood,
//   target: "_blank",
// };

class HomeButtons extends React.Component {
  styles = StyleSheet.create({
    item: {
      flex: 1,
      height: 160,
      margin: 1,
    },
    list: {
      flex: 1,
    },
  });

  _renderItem = (data: THomeButtonRouterLink, i: number) => (
    <HomeButton
      buttonColor={data.color}
      height={90}
      text={data.text}
      icon={data.icon}
      key={i}
    />
  );

  render() {
    return (
      <Grid
        style={this.styles.list}
        renderItem={this._renderItem}
        // renderPlaceholder={this._renderPlaceholder}
        data={routerLinkButtons}
        numColumns={2}
      />
    );
  }
}

export default HomeButtons;
