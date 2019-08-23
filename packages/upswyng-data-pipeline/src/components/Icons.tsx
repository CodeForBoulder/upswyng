import React from "react";
import {
  BusinessCenter,
  Call,
  DirectionsBus,
  Home,
  LocalHospital,
  People,
  Pets,
  Wifi,
} from "react-native-vector-icons";
import { default as Banana } from "./BananaIcon";
import { default as Door } from "./DoorIcon";
import { default as Hygiene } from "./HygieneIcon";
import { default as Socks } from "./SocksIcon";
import { TIconProps } from "../types";

export const BananaIcon: React.ReactElement<TIconProps> = <Banana />;
export const CallIcon: React.ReactElement<TIconProps> = <Call />;
export const DoorIcon: React.ReactElement<TIconProps> = <Door />;
export const BusIcon: React.ReactElement<TIconProps> = <DirectionsBus />;
export const BusinessCenterIcon: React.ReactElement<TIconProps> = (
  <BusinessCenter />
);
export const HomeIcon: React.ReactElement<TIconProps> = <Home />;
export const HygieneIcon: React.ReactElement<TIconProps> = <Hygiene />;
export const LocalHospitalIcon: React.ReactElement<TIconProps> = (
  <LocalHospital />
);
export const PeopleIcon: React.ReactElement<TIconProps> = <People />;
export const PetsIcon: React.ReactElement<TIconProps> = <Pets />;
export const SocksIcon: React.ReactElement<TIconProps> = <Socks />;
export const WifiIcon: React.ReactElement<TIconProps> = <Wifi />;
