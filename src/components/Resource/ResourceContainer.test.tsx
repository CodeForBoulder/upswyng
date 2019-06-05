import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ResourceContainer from './ResourceContainer';

jest.mock('../withResource', () => 'withResource');

describe('<ResourceContainer/>', () => {
  let wrapper: ShallowWrapper;
  let mockResourceId: string;
  let mockLocationSearch: string;
  let expectedFirebaseDataRefPath: string;

  beforeEach(() => {
    mockResourceId = 'resourceIdHere';
    mockLocationSearch = `?id=${mockResourceId}`;
    expectedFirebaseDataRefPath = `firebase-data-ref-path/${mockResourceId}`;

    history.replaceState({}, 'Resource', `/resource${mockLocationSearch}`);

    wrapper = shallow(<ResourceContainer />);
  });

  describe('<withResource/>', () => {
    it('renders', () => {
      expect(wrapper.find('withResource').length).toBe(1);
    });

    it('has a dataPath prop equal to the expected Firebase data reference path', () => {
      expect(wrapper.find('withResource').prop('dataPath')).toBe(
        expectedFirebaseDataRefPath
      );
    });

    describe('when a resource is not currently selected', () => {
      beforeEach(() => {
        history.replaceState({}, 'No ID Search Parameter in this URL', `/`);

        wrapper = shallow(<ResourceContainer />);
      });

      it('does not render', () => {
        expect(wrapper.type()).toBeNull();
      });
    });
  });
});
