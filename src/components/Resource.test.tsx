import React from 'react';
import { shallow } from 'enzyme';
import { Resource } from './Resource';
import { foodResource, blankResource } from '../DataMocks';
import useResource from './useResource';

jest.mock('../utils/searchParams');
jest.mock('../constants');
jest.mock('./LoadingSpinner.tsx', () => 'LoadingSpinner');
jest.mock('./useResource.tsx');
const mockedUseResource = useResource as jest.Mock;

describe('<Resource/>', () => {
  mockedUseResource.mockImplementation(() => foodResource) as typeof jest.mock;
  const wrapper = shallow(<Resource />);

  it('renders the charityname property of the resource prop object', () => {
    expect(wrapper.find('div').text()).toBe(foodResource.charityname);
  });

  it('renders nothing when a resource is not loaded', () => {
    mockedUseResource.mockImplementation(() => null) as typeof jest.mock;
    const wrapper = shallow(<Resource />);

    expect(wrapper.isEmptyRender).toBeTruthy();
  });

  describe('when it is passed a blank resource', () => {
    const props = {
      id: 'the ID of the resource being loaded',
      resource: blankResource
    };
    const wrapper = shallow(<Resource {...props} />);

    it('renders a <LoadingSpinner/>', () => {
      expect(wrapper.find('LoadingSpinner').length).toBe(1);
    });
  });
});
