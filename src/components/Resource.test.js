import React from 'react';
import { shallow } from 'enzyme';
import Resource, { resourceApiReturn } from './Resource';
jest.mock('./Carousel', () => 'Carousel');

describe('<Resource/>', () => {
  const props = { singeResourceApiReturn: resourceApiReturn };
  const wrapper = shallow(<Resource {...props} />);
  console.log(wrapper.debug());
  it('renders all required information', () => {
    expect(wrapper.find('Carousel').length).toBe(1);
  });
});
