import { getSearchParamVal } from './searchParams';

describe('getSearchParamVal()', () => {
  let mockSearchParamName;
  let mockSearchParamVal;
  let mockSearch;

  let searchParamVal;

  beforeEach(() => {
    history.replaceState({}, 'Page with no Search Parameters', '/');
  });

  it('returns the value of the provided search parameter', () => {
    mockSearchParamName = 'the-name-of-the-search-param';
    mockSearchParamVal = 'the-value-of-the-search-param';

    mockSearch = `?${mockSearchParamName}=${mockSearchParamVal}`;
    history.replaceState({}, 'Some Page', `/some-page${mockSearch}`);

    searchParamVal = getSearchParamVal(mockSearchParamName);

    expect(searchParamVal).toBe(mockSearchParamVal);
  });

  describe('when the search parameter does not exist in the url', () => {
    it('returns null', () => {
      mockSearchParamName = 'I-should-not-exist-as-a-search-parameter';
      mockSearch = `?some-other-search-parameter=some-value`;

      history.replaceState({}, 'Some Page', `/some-page${mockSearch}`);

      searchParamVal = getSearchParamVal(mockSearchParamName);

      expect(searchParamVal).toBeNull();
    });
  });

  describe('when the search parameter exists but does not have a value', () => {
    it('returns null', () => {
      mockSearchParamName = 'searchParamWithoutValue';
      mockSearch = `?${mockSearchParamName}`;

      history.replaceState({}, 'Some Page', `some-page${mockSearch}`);

      searchParamVal = getSearchParamVal(mockSearchParamName);

      expect(searchParamVal).toBeNull();
    });
  });
});
