import React from 'react';
import {
  BusinessCenter,
  Call,
  Restaurant,
  Home,
  HotTub,
  DirectionsBus,
  LocalGroceryStore,
  LocalHospital,
  LibraryBooks,
  People,
  Pets,
  Wifi
} from '@material-ui/icons';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

export const CallIcon: React.ReactElement<SvgIconProps> = <Call />;
export const BusinessCenterIcon: React.ReactElement<SvgIconProps> = (
  <BusinessCenter />
);
export const RestaurantIcon: React.ReactElement<SvgIconProps> = <Restaurant />;
export const HomeIcon: React.ReactElement<SvgIconProps> = <Home />;
export const HotTubIcon: React.ReactElement<SvgIconProps> = <HotTub />;
export const BusIcon: React.ReactElement<SvgIconProps> = <DirectionsBus />;
export const GroceryStoreIcon: React.ReactElement<SvgIconProps> = (
  <LocalGroceryStore />
);
export const LocalHospitalIcon: React.ReactElement<SvgIconProps> = (
  <LocalHospital />
);
export const LibraryBooksIcon: React.ReactElement<SvgIconProps> = (
  <LibraryBooks />
);
export const PeopleIcon: React.ReactElement<SvgIconProps> = <People />;
export const PetsIcon: React.ReactElement<SvgIconProps> = <Pets />;
export const WifiIcon: React.ReactElement<SvgIconProps> = <Wifi />;
