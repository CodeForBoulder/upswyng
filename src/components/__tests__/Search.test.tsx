import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Search from '../Search';
import useSearchResults from '../useSearchResults';
import { SEARCH_PARAM_RESOURCE } from '../../constants';

jest.mock('../../utils/searchParams', () => ({
  getSearchParamVal: () => 'someSearchQuery'
}));
jest.mock('../useSearchResults');
jest.mock('react-router-dom', () => ({
  Link: 'Link'
}));
jest.mock('../LoadingSpinner', () => 'LoadingSpinner');

describe('<Search/>', () => {
  const getSubject = () => shallow(<Search />);
  describe('when it does not receive any search hits', () => {
    beforeAll(() => {
      (useSearchResults as jest.Mock).mockImplementation(() => null);
    });

    it('renders a loading spinner', () => {
      expect(getSubject().find('LoadingSpinner').length).toBe(1);
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
      (useSearchResults as jest.Mock).mockImplementation(() => ({
        hits: mockHits
      }));
    });

    it('renders a <SearchResults/>', () => {
      expect(getSubject().find('SearchResults').length).toBe(1);
    });
  });
});
