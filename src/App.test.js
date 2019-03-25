import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
jest.mock('./components/Header', () => 'Header');
jest.mock('react-router-dom/Route', () => 'Route');

describe('<App />', () => {
  const wrapper = shallow(<App />);
  const routes = [
    {
      path: '/',
      component: 'Home'
    },
    {
      path: '/shelters',
      component: 'Shelters'
    },
    {
      path: '/hygiene',
      components: 'Hygiene'
    },
    {
      path: '/hotlines',
      component: 'Hotlines'
    },
    {
      path: '/food',
      component: 'Food'
    },
    {
      path: '/transit',
      component: 'Transit'
    }
  ];
  it('renders properly', () => {
    expect(wrapper.find('Header').length).toBe(1);
    routes.forEach(route => {
      expect(
        wrapper.findWhere(n => {
          return n.type() === 'Route' && n.prop('path') === route.path;
        }).length
      ).toBe(1);
    });
  });
});
