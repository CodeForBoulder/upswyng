import React from 'react';
import { shallow, EnzymeAdapter, ShallowWrapper } from 'enzyme';
import SearchResults from '../SearchResults';
import useSearchResults from '../useSearchResults';
import { SEARCH_PARAM_QUERY } from '../../constants';

jest.mock('../useSearchResults');
jest.mock('react-router-dom', () => ({
  Link: 'Link'
}));

describe('<SearchResults/>', () => {
  const getSubject = () => shallow(<SearchResults />);
  describe('when it does not receive any search hits', () => {
    beforeAll(() => {
      const mockHits: [] = [];
      useSearchResults.mockImplementation(() => ({
        hits: mockHits
      }));
    });

    it('does not render a list of results', () => {
      expect(getSubject().find('ul').length).toBe(0);
    });
  });

  describe('when it receives at least one search hit', () => {
    const mockHits = [
      {
        charityname: 'Mikes Tots',
        objectID: '-someRandomId'
      },
      {
        charityname:
          "Al Harrington's Wacky Waving Inflatable Arm-Flailing Tubeman Emporium and Warehouse",
        objectID: '-anotherRandomId'
      }
    ];

    beforeEach(() => {
      useSearchResults.mockImplementation(() => ({
        hits: mockHits
      }));
    });

    it('renders one <ul>', () => {
      expect(getSubject().find('ul').length).toBe(1);
    });

    const getListItems = () => getSubject().find('li');

    it('renders an <li> for each hit', () => {
      expect(getListItems().length).toBe(mockHits.length);
    });

    describe('each <li>', () => {
      it('has a key equal to the hits objectID property', () => {
        getListItems().forEach((listItem, index) => {
          expect(listItem.key()).toBe(mockHits[index].objectID);
        });
      });

      describe('<Link/>', () => {
        const getLink = (component: ShallowWrapper) => component.find('Link');
        it('has a to.search prop containing the proper query', () => {
          getListItems().forEach((listItem, index) => {
            expect(getLink(listItem).prop('to').search).toContain(
              `${SEARCH_PARAM_QUERY}=${mockHits[index].objectID}`
            );
          });
        });

        it('contains the charity name', () => {
          getListItems().forEach((listItem, index) => {
            expect(getLink(listItem).text()).toContain(
              mockHits[index].charityname
            );
          });
        });
      });
    });
  });
});
