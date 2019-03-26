import React from 'react';
import { shallow } from 'enzyme';
import { HomeComponent, HomeButtonsMajor, HomeButtonsMinor } from './Home';
jest.mock('@material-ui/core/Grid', () => 'Grid');
jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('@material-ui/icons/Call', () => 'CallIcon');
jest.mock('@material-ui/icons/Restaurant', () => 'RestaurantIcon');
jest.mock('@material-ui/icons/Home', () => 'HomeIcon');
jest.mock('@material-ui/icons/HotTub', () => 'HotTubIcon');
jest.mock('@material-ui/icons/DirectionsBus', () => 'BusIcon');
jest.mock('@material-ui/icons/LocalGroceryStore', () => 'GroceryStoreIcon');
jest.mock('@material-ui/icons/Healing', () => 'HealingIcon');
jest.mock('@material-ui/icons/LibraryBooks', () => 'LibraryBooksIcon');
jest.mock('@material-ui/icons/Pets', () => 'PetsIcon');
jest.mock('@material-ui/icons/Wifi', () => 'WifiIcon');
jest.mock('@material-ui/icons/Work', () => 'WorkIcon');
jest.mock('@material-ui/icons/Info', () => 'InfoIcon');
jest.mock('./Search', () => 'Search');

describe('<Home/>', () => {
  const wrapper = shallow(<HomeComponent />);

  const numSearchGridComponents = 3;
  const numButtonsMajorGridComponents = 2 + HomeButtonsMajor.length * 2;
  const numButtonsMinorGridComponents = 2 + HomeButtonsMinor.length * 2;
  it('renders the proper number of layout components', () => {
    expect(wrapper.find('Grid').length).toBe(
      1 +
        numSearchGridComponents +
        numButtonsMajorGridComponents +
        numButtonsMinorGridComponents
    );
  });
  it('renders one layout component as the search component', () => {
    expect(
      wrapper.findWhere(n => n.prop('component') === 'Search').length
    ).toBe(1);
  });
  it('renders all major buttons and only once', () => {
    HomeButtonsMajor.forEach(button => {
      let matchingButtons = wrapper
        .findWhere(child => {
          return (
            child.type() === 'IconButton' &&
            child.text() === button.text &&
            child.find(`${button.icon}`).length === 1
          );
        })
        .map(iconButton => iconButton.text());
      expect(matchingButtons).toContain(button.text);
      expect(matchingButtons.length).toBe(1);
    });
  });
  it('renders all minor buttons and only once', () => {
    HomeButtonsMinor.forEach(button => {
      let matchingButtons = wrapper
        .findWhere(child => {
          return (
            child.type() === 'IconButton' &&
            child.text() === button.text &&
            child.find(`${button.icon}`).length === 1
          );
        })
        .map(iconButton => iconButton.text());
      expect(matchingButtons).toContain(button.text);
      expect(matchingButtons.length).toBe(1);
    });
  });
});
