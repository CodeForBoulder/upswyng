import React from 'react';
import { shallow } from 'enzyme';
import { HomeComponent, HomeButtonsMajor, HomeButtonsMinor } from './Home';
import { Link } from 'react-router-dom';
jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/core/Grid', () => 'Grid');
jest.mock('./Icons');
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
      const matchingButtons = wrapper
        .findWhere(child => {
          return (
            child.type() === 'Button' &&
            child.containsMatchingElement(button.text) &&
            child.containsMatchingElement(button.icon) &&
            child.prop('component') &&
            child.prop('component') === Link &&
            child.prop('to') === button.to
          );
        })
        .map(iconButton => button.text);
      expect(matchingButtons).toContain(button.text);
      expect(matchingButtons.length).toBe(1);
    });
  });
  it('renders all minor buttons and only once', () => {
    HomeButtonsMinor.forEach(button => {
      let matchingButtons = wrapper
        .findWhere(child => {
          return (
            child.type() === 'Button' &&
            child.containsMatchingElement(button.text) &&
            child.containsMatchingElement(button.icon) &&
            child.prop('component') &&
            child.prop('component') === Link &&
            child.prop('to') === button.to
          );
        })
        .map(iconButton => button.text);
      expect(matchingButtons).toContain(button.text);
      expect(matchingButtons.length).toBe(1);
    });
  });
});
