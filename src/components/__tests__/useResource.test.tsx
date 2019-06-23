import { Mock } from 'firebase-nightlight';
import { renderHook } from '@testing-library/react-hooks';
import { foodResource as mockResource } from '../../DataMocks';

// see https://github.com/kulshekhar/ts-jest/issues/120#issuecomment-283653644
// for some helpful info about some typescript nonsense with jest

jest.mock('../../firebase', () => {
  mockApp = new Mock(); // eslint-disable-line @typescript-eslint/no-use-before-define
  return {
    __esModule: true,
    default: mockApp.initializeApp({}) // eslint-disable-line @typescript-eslint/no-use-before-define
  };
});

import useResource from '../useResource';

var mockApp: Mock; // using `var` here so it is hoisted above the mock -- would love a better solution

it('should set init value', async () => {
  const { result } = renderHook((path: string) => useResource(path), {
    initialProps: '/resources/ex-id'
  });
  expect(result.current).toBeNull();
});

it('should update the result when a resource has been recieved', async () => {
  // This currently raises a Jest warning for not wrapping the async action in `act`.
  // It will be fixed eventually in the react-hooks testing library. See:
  // https://github.com/testing-library/react-hooks-testing-library/blob/master/docs/usage/advanced-hooks.md#act-warning

  const { result, waitForNextUpdate } = renderHook(
    (path: string) => useResource(path),
    { initialProps: '/resources/ex_id' }
  );
  expect(result.current).toBeNull();
  mockApp
    .database()
    .ref('/resources/ex_id')
    .update(mockResource);
  await waitForNextUpdate();
  expect(result.current).toEqual(mockResource);
});
