import React from 'react';

const Carousel = props => {
  return typeof props.images === 'object' && props.images.length ? (
    <>
      {props.images.map(image => (
        <img key={image.id} src={image.url} alt={image.description} />
      ))}
    </>
  ) : null;
};

export default Carousel;
