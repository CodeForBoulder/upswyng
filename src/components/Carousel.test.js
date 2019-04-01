import React from 'react';
import { shallow } from 'enzyme';
import Carousel from './Carousel';

describe('<Carousel/>', () => {
  let wrapper, props;

  beforeEach(() => {
    props = {
      images: [
        {
          id: '123yvu1231bv23',
          url: 'https://placeholder.com/480x200.png',
          description: 'brief image description here'
        },
        {
          id: '09nhgfnbdv212j',
          url: 'https://placeholder.com/480x250.png',
          description: 'brief image description here'
        }
      ]
    };
    wrapper = shallow(<Carousel {...props} />);
  });
  it('renders all images and only once', () => {
    let renderedImages;
    props.images.forEach(image => {
      renderedImages = wrapper
        .findWhere(child => {
          return (
            child.type() === 'img' &&
            child.prop('src') === image.url &&
            child.prop('alt') === image.description
          );
        })
        .map(renderedImage => renderedImage.prop('src'));
      expect(renderedImages).toContain(image.url);
      expect(renderedImages.length).toBe(1);
    });
  });
  it("doesn't render if props are not provided", () => {
    wrapper = shallow(<Carousel />);
    expect(wrapper.children().length).toBe(0);
  });
  it("doesn't render if the images prop is not an array", () => {
    props = {
      images: 'use a string since it also has a length property'
    };
    wrapper = shallow(<Carousel {...props} />);
    expect(wrapper.children().length).toBe(0);
  });
  it("doesn't render if the images prop is an empty array", () => {
    props = {
      images: []
    };
    wrapper = shallow(<Carousel {...props} />);
    expect(wrapper.children().length).toBe(0);
  });
});
