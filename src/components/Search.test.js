import React from 'react';
import { mount } from 'enzyme';
import Search from './Search';
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

describe('<Search />', () => {
  const wrapper = mount(<Search />);
  it('renders properly', () => {
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find(TextField).length).toBe(1);
    expect(wrapper.find(InputAdornment).length).toBe(1);
    expect(wrapper.find(SearchIcon).length).toBe(1);
  });
});
