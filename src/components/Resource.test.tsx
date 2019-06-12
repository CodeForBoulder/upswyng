import React from 'react';
import { shallow } from 'enzyme';
import Resource from './Resource';
import { foodResource } from '../DataMocks';

describe('<Resource/>', () => {
  const mockSingleResourceId = '-KS4rbQziVbJM5tNdEQL';

  const props = {
    id: mockSingleResourceId,
    resource: foodResource
  };
  const wrapper = shallow(<Resource {...props} />);

  it('renders the charityname property of the resource prop object', () => {
    expect(wrapper.find('div').text()).toBe(props.resource.charityName);
  });
});
