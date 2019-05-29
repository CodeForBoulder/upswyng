import React from 'react';
import {
  Call,
  Restaurant,
  Home,
  HotTub,
  DirectionsBus,
  LocalGroceryStore,
  Healing,
  LibraryBooks,
  Pets,
  Wifi,
  Work,
  Info
} from '@material-ui/icons';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

export const CallIcon: React.ReactElement<SvgIconProps> = <Call />;
export const RestaurantIcon: React.ReactElement<SvgIconProps> = <Restaurant />;
export const HomeIcon: React.ReactElement<SvgIconProps> = <Home />;
export const HotTubIcon: React.ReactElement<SvgIconProps> = <HotTub />;
export const BusIcon: React.ReactElement<SvgIconProps> = <DirectionsBus />;
export const GroceryStoreIcon: React.ReactElement<SvgIconProps> = (
  <LocalGroceryStore />
);
export const HealingIcon: React.ReactElement<SvgIconProps> = <Healing />;
export const LibraryBooksIcon: React.ReactElement<SvgIconProps> = (
  <LibraryBooks />
);
export const PetsIcon: React.ReactElement<SvgIconProps> = <Pets />;
export const WifiIcon: React.ReactElement<SvgIconProps> = <Wifi />;
export const WorkIcon: React.ReactElement<SvgIconProps> = <Work />;
export const InfoIcon: React.ReactElement<SvgIconProps> = <Info />;
