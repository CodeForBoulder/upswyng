import React from 'react';
import { mount } from 'enzyme';
import Search from './Search';
jest.mock('@material-ui/core/TextField', () => 'TextField');

describe('<Search />', () => {
  const wrapper = mount(<Search />);
  it('renders a required form element', () => {
    expect(wrapper.find('form').length).toBe(1);
  });
  it('renders a TextField', () => {
    expect(wrapper.find('TextField').length).toBe(1);
  });
});
