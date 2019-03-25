import React from 'react';
import { mount } from 'enzyme';
import Home from './Home';
import { Grid } from '@material-ui/core';
import Search from './Search';

describe('<Home/>', () => {
  const wrapper = mount(<Home />);
  it('renders properly', () => {
    expect(wrapper.find(Grid).length).toBe(2);
    expect(wrapper.find(Search).length).toBe(1);
  });
});
