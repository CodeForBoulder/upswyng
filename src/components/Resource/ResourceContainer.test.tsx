import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ResourceContainer from './ResourceContainer';
import withResource from '../withResource';

jest.mock('../withResource');
jest.mock('./Resource', () => 'Resource');

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

  describe('withResource()', () => {
    it('was called with the Resource component and expected firebase data reference path', () => {
      expect(withResource).toHaveBeenCalledWith(
        'Resource',
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
