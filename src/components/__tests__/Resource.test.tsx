import { shallow } from 'enzyme';
import React from 'react';
import { foodResource } from '../../DataMocks';
import { Resource } from '../Resource';
import useResourceNew from '../useResourceNew';

jest.mock('../../utils/searchParams');
jest.mock('../../constants');
jest.mock('../LoadingSpinner.tsx', () => 'LoadingSpinner');
jest.mock('../useResourceNew.tsx');
const mockedUseResourceNew = useResourceNew as jest.Mock;
jest.mock('../../App.styles', () => ({
  Container: 'Container',
  colors: {
    greyLight: ''
  },
  font: {
    families: {
      openSans: ''
    },
    helpers: {
      convertPixelsToRems: (pixels: number) => pixels
    }
  }
}));
jest.mock('../../utils/searchParams', () => ({
  getSearchParamVal: () => 'some resource ID'
}));
jest.mock('../PageBanner', () => 'PageBanner');
jest.mock('../Details', () => ({
  __esModule: true,
  default: 'Details',
  DetailBody: 'DetailBody',
  DetailHeading: 'DetailHeading'
}));
jest.mock('../Schedule', () => 'Schedule');
jest.mock('../Map', () => 'Map');

describe('<Resource/>', () => {
  mockedUseResourceNew.mockImplementation(
    () => foodResource
  ) as typeof jest.mock;
  const wrapper = shallow(<Resource />);

  it('renders the charityname property of the resource prop object', () => {
    expect(wrapper.find('PageBanner').prop('text')).toBe(foodResource.name);
  });

  it('renders a map component', () => {
    expect(wrapper.find('Map').length).toBe(1);
  });

  it('renders a loading spinner when a resource is not loaded', () => {
    mockedUseResourceNew.mockImplementation(
      () => undefined
    ) as typeof jest.mock;
    const wrapper = shallow(<Resource />);

    expect(wrapper.find('LoadingSpinner').length).toBe(1);
  });
});
