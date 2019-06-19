import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Search from './Search';

jest.mock('react-router/Redirect', () => 'Redirect');
jest.mock('@material-ui/core/TextField', () => 'TextField');

describe('<Search />', () => {
  let wrapper: enzyme.ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Search />);
  });

  it('renders a TextField', () => {
    expect(wrapper.find('TextField').length).toBe(1);
  });

  describe('when the <TextField/> changes', () => {
    it('has a value prop equal to the changed value', () => {
      const getRenderedTextField = () => wrapper.find('TextField');
      const mockInputValue = 'a submitted search';

      getRenderedTextField().simulate('change', {
        target: {
          value: mockInputValue
        }
      });
      wrapper.update();

      expect(getRenderedTextField().prop('value')).toBe(mockInputValue);
    });
  });

  describe('when the form is submitted', () => {
    it('prevents the default event action', () => {
      const mockPreventDefault = jest.fn();

      wrapper.find('form').simulate('submit', {
        preventDefault: mockPreventDefault
      });

      expect(mockPreventDefault).toBeCalled();
    });

    it('renders a <Redirect/> element', () => {
      expect(wrapper.find('Redirect').length).toBe(0);

      wrapper.find('form').simulate('submit', {
        preventDefault: jest.fn()
      });
      wrapper.update();

      expect(wrapper.find('Redirect').length).toBe(1);
    });
  });
});
