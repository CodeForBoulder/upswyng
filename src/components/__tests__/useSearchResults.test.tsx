import { renderHook } from '@testing-library/react-hooks';
import useSearchResults from '../useSearchResults';

jest.mock('algoliasearch', () => () => ({
  initIndex: () => ({
    search: (query: string, callback: (a: null, b: string) => string) => {
      if (query) {
        callback(null, 'some search results');
      }
    }
  })
}));

it('should set init value', async () => {
  const { result } = renderHook((path: string) => useSearchResults(path));
  expect(result.current).toBeNull();
});

it('should update the result when a search results are received', async () => {
  const { result } = renderHook((path: string) => useSearchResults(path), {
    initialProps: 'some search query here'
  });

  expect(result.current).toBe('some search results');
});
