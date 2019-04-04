import React from 'react';
import { shallow } from 'enzyme';
import { HomeComponent, HomeButtonsMajor, HomeButtonsMinor } from './Home';
jest.mock('@material-ui/core/Button', () => 'button-material-ui');
jest.mock('@material-ui/core/Grid', () => 'Grid');
jest.mock('./Icons');
jest.mock('./Search', () => 'Search');

describe('<Home/>', () => {
  const wrapper = shallow(<HomeComponent />);

  const numSearchGridComponents = 3;
  const numButtonsMajorGridComponents = 2 + HomeButtonsMajor.length * 2;
  const numButtonsMinorGridComponents = 2 + HomeButtonsMinor.length * 2;
  const renderedMajorButtons = wrapper.find(
    'button-material-ui.button.button--home:not(.button--home-minor)'
  );
  const renderedMinorButtons = wrapper.find(
    'button-material-ui.button.button--home.button--home-minor'
  );
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
  it('renders the proper number of minor buttons', () => {
    expect(renderedMinorButtons.length).toBe(HomeButtonsMinor.length);
  });
  describe('major buttons', () => {
    it('renders the proper number of major buttons', () => {
      expect(renderedMajorButtons.length).toBe(HomeButtonsMajor.length);
    });
    HomeButtonsMajor.forEach(expectedButton => {
      describe(`${expectedButton.text} button`, () => {
        const renderedButton = renderedMajorButtons.find(
          `[data-test="${expectedButton.text}"]`
        );
        it(`renders only one of the ${expectedButton.text}`, () => {
          expect(renderedButton.length).toBe(1);
        });
        it('renders one button with matching text', () => {
          expect(renderedButton.render().text()).toBe(expectedButton.text);
        });
        it('renders one button with a matching icon', () => {
          expect(
            renderedButton.containsMatchingElement(expectedButton.icon)
          ).toBe(true);
        });
        it('renders one button with a matching link', () => {
          expect(renderedButton.prop('to')).toBe(expectedButton.to);
        });
      });
    });
  });
  describe('minor buttons', () => {
    it('renders the proper number of minor buttons', () => {
      expect(renderedMinorButtons.length).toBe(HomeButtonsMinor.length);
    });
    HomeButtonsMinor.forEach(expectedButton => {
      describe(`${expectedButton.text} button`, () => {
        const renderedButton = renderedMinorButtons.find(
          `[data-test="${expectedButton.text}"]`
        );
        it('renders only one of each button', () => {
          expect(renderedButton.length).toBe(1);
        });
        it('renders one button with matching text', () => {
          expect(renderedButton.render().text()).toBe(expectedButton.text);
        });
        it('renders one button with a matching icon', () => {
          expect(
            renderedButton.containsMatchingElement(expectedButton.icon)
          ).toBe(true);
        });
        it('renders one button with a matching link', () => {
          expect(renderedButton.prop('to')).toBe(expectedButton.to);
        });
      });
    });
  });
});
