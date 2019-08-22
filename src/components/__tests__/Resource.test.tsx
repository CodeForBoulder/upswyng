import { shallow } from 'enzyme';
import React from 'react';
import { foodResource } from '../../DataMocks';
import { Resource } from '../Resource';
import useResource from '../useResource';

jest.mock('../../utils/searchParams');
jest.mock('../../constants');
jest.mock('../LoadingSpinner.tsx', () => 'LoadingSpinner');
jest.mock('../useResource.tsx');
const mockedUseResource = useResource as jest.Mock;
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
jest.mock('../Details', () => ({
  __esModule: true,
  default: 'Details',
  DetailBody: 'DetailBody',
  DetailHeading: 'DetailHeading'
}));
jest.mock('../Schedule', () => 'Schedule');
jest.mock('../Map', () => 'Map');

describe('<Resource/>', () => {
  mockedUseResource.mockImplementation(() => foodResource) as typeof jest.mock;
  const wrapper = shallow(<Resource />);

  it('renders the charityname property of the resource prop object', () => {
    expect(wrapper.find('h1').text()).toBe(foodResource.charityname);
  });

  it('renders a map component', () => {
    expect(wrapper.find('Map').length).toBe(1);
  });

  it('renders a loading spinner when a resource is not loaded', () => {
    mockedUseResource.mockImplementation(() => null) as typeof jest.mock;
    const wrapper = shallow(<Resource />);

    expect(wrapper.find('LoadingSpinner').length).toBe(1);
  });
});
