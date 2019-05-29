import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';
import HomeButtonsMajor from './HomeButtonsMajor';
import HomeButtonsMinor from './HomeButtonsMinor';
jest.mock('react-router-dom/Link');
jest.mock('@material-ui/core/Button', () => 'button-material-ui');
jest.mock('@material-ui/core/Grid', () => 'Grid');
jest.mock('./Icons');
jest.mock('./Search', () => 'Search');

describe('<Home/>', () => {
  const wrapper = shallow(<Home />);

  it('renders the proper number of layout components', () => {
    const numSearchGridComponents = 3;
    const numButtonsMajorGridComponents = 2 + HomeButtonsMajor.length * 2;
    const numButtonsMinorGridComponents = 2 + HomeButtonsMinor.length * 2;
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

  describe('major buttons', () => {
    const renderedMajorButtons = wrapper.find(
      '.tile.tile--home:not(.tile--home-minor)'
    );

    it('renders the proper number of major buttons', () => {
      expect(renderedMajorButtons.length).toBe(HomeButtonsMajor.length);
    });

    HomeButtonsMajor.forEach(expectedButton => {
      describe(`${expectedButton.text} button`, () => {
        const renderedLink = renderedMajorButtons.find(
          `[data-test="${expectedButton.text}"]`
        );
        const renderedButton = renderedLink.find('button-material-ui');

        it(`renders only one ${expectedButton.text} button`, () => {
          expect(renderedLink.length).toBe(1);
        });

        it('has a matching "to" property', () => {
          expect(renderedLink.prop('to')).toBe(expectedButton.to);
        });

        it('renders one button with matching text', () => {
          expect(renderedButton.render().text()).toBe(expectedButton.text);
        });

        it('renders one button with a matching icon', () => {
          expect(
            renderedLink.containsMatchingElement(expectedButton.icon)
          ).toBe(true);
        });
      });
    });
  });

  describe('minor buttons', () => {
    const renderedMinorButtons = wrapper.find(
      '.tile.tile--home.tile--home-minor'
    );

    it('renders the proper number of minor buttons', () => {
      expect(renderedMinorButtons.length).toBe(HomeButtonsMinor.length);
    });

    HomeButtonsMinor.forEach(expectedButton => {
      describe(`${expectedButton.text} button`, () => {
        const renderedLink = renderedMinorButtons.find(
          `[data-test="${expectedButton.text}"]`
        );
        const renderedButton = renderedLink.find('button-material-ui');

        it(`renders only one ${expectedButton.text} button`, () => {
          expect(renderedLink.length).toBe(1);
        });

        it('has a matching "to" property', () => {
          expect(renderedLink.prop('to')).toBe(expectedButton.to);
        });

        it('renders one button with matching text', () => {
          expect(renderedButton.render().text()).toBe(expectedButton.text);
        });

        it('renders one button with a matching icon', () => {
          expect(
            renderedLink.containsMatchingElement(expectedButton.icon)
          ).toBe(true);
        });
      });
    });
  });
});
