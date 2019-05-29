import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Shelters from './components/Shelters';
import Hygiene from './components/Hygiene';
import Hotlines from './components/Hotlines';
import Food from './components/Food';
import Transit from './components/Transit';

describe('<App />', () => {
  const wrapper = shallow(<App />);
  const routes = [Home, Shelters, Hygiene, Hotlines, Food, Transit];

  it('renders properly', () => {
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find(Header).length).toBe(1);
    expect(wrapper.find(Route).length).toBe(routes.length);
  });
});
