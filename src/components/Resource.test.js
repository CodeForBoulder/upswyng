import React from 'react';
import { shallow } from 'enzyme';
import Resource, { singleResourceId } from './Resource';
jest.mock('./Carousel', () => 'Carousel');

describe('<Resource/>', () => {
  const props = { id: singleResourceId };
  const wrapper = shallow(<Resource {...props} />);
  it('renders all required information', () => {
    expect(wrapper.find('Carousel').length).toBe(1);
  });
});
