import {
  CallIcon,
  RestaurantIcon,
  HomeIcon,
  HotTubIcon,
  BusIcon,
  GroceryStoreIcon,
  HealingIcon,
  LibraryBooksIcon,
  PetsIcon,
  WifiIcon,
  WorkIcon,
  InfoIcon
} from './Icons';

const HomeButtonsMajor = [
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
  },
  {
    text: 'Hotlines',
    icon: CallIcon,
    to: '/hotlines'
  },
  {
    text: 'Health',
    icon: HealingIcon,
    to: '/health'
  },
  {
    text: 'Wifi & Tech',
    icon: WifiIcon,
    to: '/wifi-and-tech'
  },
  {
    text: 'Job Training',
    icon: WorkIcon,
    to: '/work'
  },
  {
    text: 'Social Services',
    icon: InfoIcon,
    to: '/social-services'
  }
];

export default HomeButtonsMajor;
