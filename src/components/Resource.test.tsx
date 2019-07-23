import React from 'react';
import { shallow } from 'enzyme';
import { Resource } from './Resource';
import { foodResource, blankResource } from '../DataMocks';

jest.mock('./withResource');
jest.mock('../utils/searchParams');
jest.mock('../constants');
jest.mock('./LoadingSpinner.tsx', () => 'LoadingSpinner');

describe('<Resource/>', () => {
  const mockSingleResourceId = '-KS4rbQziVbJM5tNdEQL';

  const props = {
    id: mockSingleResourceId,
    resource: foodResource
  };
  const wrapper = shallow(<Resource {...props} />);

  it('renders the charityname property of the resource prop object', () => {
    expect(wrapper.find('div').text()).toBe(props.resource.charityname);
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
