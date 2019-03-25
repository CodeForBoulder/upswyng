import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
jest.mock('./components/Header', () => 'Header');
jest.mock('react-router-dom/Route', () => 'Route');
jest.mock('./components/Home', () => 'Home');
jest.mock('./components/Shelters', () => 'Shelters');
jest.mock('./components/Hygiene', () => 'Hygiene');
jest.mock('./components/Hotlines', () => 'Hotlines');
jest.mock('./components/Food', () => 'Food');
jest.mock('./components/Transit', () => 'Transit');

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
      component: 'Hygiene'
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
  it('renders the header component', () => {
    expect(wrapper.find('Header').length).toBe(1);
  });
  it('matches each route with appropriate component', () => {
    routes.forEach(route => {
      expect(
        wrapper.findWhere(n => {
          return (
            n.type() === 'Route' &&
            n.prop('path') === route.path &&
            n.prop('component') === route.component
          );
        }).length
      ).toBe(1);
    });
  });
});
