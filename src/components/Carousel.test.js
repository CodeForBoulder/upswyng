import React from 'react';
import { shallow } from 'enzyme';
import Carousel from './Carousel';

describe('<Carousel/>', () => {
  const props = {
    images: [
      {
        url: 'https://placeholder.com/480x200.png',
        description: 'brief image description here'
      },
      {
        url: 'https://placeholder.com/480x250.png',
        description: 'brief image description here'
      }
    ]
  };
  const wrapper = shallow(<Carousel {...props} />);
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
});
