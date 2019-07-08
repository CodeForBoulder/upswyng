import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';
jest.mock('react-router-dom/Link');
jest.mock('@material-ui/core/Button', () => 'button-material-ui');
jest.mock('@material-ui/core/Grid', () => 'Grid');
jest.mock('./Icons');
jest.mock('./Search', () => 'Search');
jest.mock('./HomeButtons', () => 'HomeButtons');

describe('<Home/>', () => {
  const wrapper = shallow(<Home />);

  it('renders a <Search/>', () => {
    expect(wrapper.find('Search').length).toBe(1);
  });

  it('renders a <HomeButtons/>', () => {
    expect(wrapper.find('HomeButtons').length).toBe(1);
  });
});
