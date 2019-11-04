import React from "react";
import {
  Close,
  BusinessCenter,
  Call,
  DirectionsBike,
  DirectionsBus,
  DirectionsCar,
  DirectionsWalk,
  Home,
  Info,
  LocalHospital,
  NextWeek,
  People,
  Pets,
  Policy,
  Wifi,
} from "@material-ui/icons";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { default as Banana } from "./BananaIcon";
import { default as Door } from "./DoorIcon";
import { default as Hygiene } from "./HygieneIcon";
import { default as Socks } from "./SocksIcon";

export const BananaIcon: React.ReactElement<SvgIconProps> = <Banana />;
export const BikeIcon: React.ReactElement<SvgIconProps> = <DirectionsBike />;
export const DoorIcon: React.ReactElement<SvgIconProps> = <Door />;
export const BusIcon: React.ReactElement<SvgIconProps> = <DirectionsBus />;
export const BusinessCenterIcon: React.ReactElement<SvgIconProps> = (
  <BusinessCenter />
);
export const CallIcon: React.ReactElement<SvgIconProps> = <Call />;
export const CarIcon: React.ReactElement<SvgIconProps> = <DirectionsCar />;
export const CloseIcon: React.ReactElement<SvgIconProps> = <Close />;
export const HomeIcon: React.ReactElement<SvgIconProps> = <Home />;
export const HygieneIcon: React.ReactElement<SvgIconProps> = <Hygiene />;
export const InfoIcon: React.ReactElement<SvgIconProps> = <Info />;
export const LocalHospitalIcon: React.ReactElement<SvgIconProps> = (
  <LocalHospital />
);
export const TermsOfServiceIcon: React.ReactElement<SvgIconProps> = (
  <NextWeek />
);
export const PeopleIcon: React.ReactElement<SvgIconProps> = <People />;
export const PetsIcon: React.ReactElement<SvgIconProps> = <Pets />;
export const PolicyIcon: React.ReactElement<SvgIconProps> = <Policy />;
export const SocksIcon: React.ReactElement<SvgIconProps> = <Socks />;
export const WalkIcon: React.ReactElement<SvgIconProps> = <DirectionsWalk />;
export const WifiIcon: React.ReactElement<SvgIconProps> = <Wifi />;
