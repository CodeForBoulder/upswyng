import React from 'react';
import { shallow } from 'enzyme';
import { resourceApiReturn, ResourceComponent } from './Resource';

describe('<Resource/>', () => {
  const wrapper = shallow(<ResourceComponent />);
  it('renders the container', () => {
    expect(wrapper.find('div').length).toBe(1);
  });
});
