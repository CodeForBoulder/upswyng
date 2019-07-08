import React from 'react';
import {
  BusinessCenter,
  Call,
  Home,
  DirectionsBus,
  LocalHospital,
  LibraryBooks,
  People,
  Pets,
  Wifi
} from '@material-ui/icons';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { default as Banana } from './BananaIcon';
import { default as Hygiene } from './HygieneIcon';
import { default as Socks } from './SocksIcon';

export const CallIcon: React.ReactElement<SvgIconProps> = <Call />;
export const BusinessCenterIcon: React.ReactElement<SvgIconProps> = (
  <BusinessCenter />
);
export const BananaIcon: React.ReactElement<SvgIconProps> = <Banana />;
export const HomeIcon: React.ReactElement<SvgIconProps> = <Home />;
export const HygieneIcon: React.ReactElement<SvgIconProps> = <Hygiene />;
export const BusIcon: React.ReactElement<SvgIconProps> = <DirectionsBus />;
export const LocalHospitalIcon: React.ReactElement<SvgIconProps> = (
  <LocalHospital />
);
export const LibraryBooksIcon: React.ReactElement<SvgIconProps> = (
  <LibraryBooks />
);
export const PeopleIcon: React.ReactElement<SvgIconProps> = <People />;
export const PetsIcon: React.ReactElement<SvgIconProps> = <Pets />;
export const SocksIcon: React.ReactElement<SvgIconProps> = <Socks />;
export const WifiIcon: React.ReactElement<SvgIconProps> = <Wifi />;
