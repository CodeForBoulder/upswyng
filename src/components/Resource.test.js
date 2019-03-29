import React from 'react';
import { shallow } from 'enzyme';
import Resource from './Resource';

describe('<Resource/>', () => {
  const wrapper = shallow(<Resource />);
  it('renders the container', () => {
    expect(wrapper.find('div').length).toBe(1);
  });
});
