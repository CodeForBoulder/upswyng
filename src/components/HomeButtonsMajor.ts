import {
  CallIcon,
  RestaurantIcon,
  HomeIcon,
  HotTubIcon,
  BusIcon,
  GroceryStoreIcon
} from './Icons';

const HomeButtonsMajor = [
  {
    text: 'Hotlines',
    icon: CallIcon,
    to: '/hotlines'
  },
  {
    text: 'Food',
    icon: RestaurantIcon,
    to: '/food'
  },
  {
    text: 'Shelter',
    icon: HomeIcon,
    to: '/shelter'
  },
  {
    text: 'Hygiene',
    icon: HotTubIcon,
    to: '/hygiene'
  },
  {
    text: 'Transit',
    icon: BusIcon,
    to: '/transit'
  },
  {
    text: 'Resources',
    icon: GroceryStoreIcon,
    to: '/resources'
  }
];

export default HomeButtonsMajor;
