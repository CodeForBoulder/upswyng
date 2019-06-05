import React from 'react';
import Carousel from './Carousel';

import { TResource } from '../types';

interface Props {
  id: string;
  resource: TResource;
}

const Resource = (props: Props) => {
  const { images } = props;
  return <Carousel images={images} />;
};

export default Resource;
