import React from 'react';

const Carousel = props => {
  return (
    <div>
      {props.images.map(image => {
        return <img src={image.url} alt={image.description} />;
      })}
    </div>
  );
};

export default Carousel;
