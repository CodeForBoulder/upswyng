import React from 'react';

const Carousel = props => {
  return typeof props.images === 'object' && props.images.length ? (
    <div>
      {props.images.map(image => {
        return <img src={image.url} alt={image.description} />;
      })}
    </div>
  ) : null;
};

export default Carousel;
