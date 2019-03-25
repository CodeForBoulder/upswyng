import React from 'react';
import { mount } from 'enzyme';
import Home from './Home';
jest.mock('@material-ui/core/Grid', () => 'Grid');
jest.mock('./Search', () => 'Search');

describe('<Home/>', () => {
  const wrapper = mount(<Home />);
  it('renders the proper number of layout components', () => {
    expect(wrapper.find('Grid').length).toBe(2);
  });
  it('renders one layout component as the search component', () => {
    expect(
      wrapper.findWhere(n => n.prop('component') === 'Search').length
    ).toBe(1);
  });
});
