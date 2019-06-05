import React from 'react';
import { TResource } from '../../types';

interface Props {
  id?: string;
  resource?: TResource;
}

const Resource = (props: Props) => {
  const { resource } = props;

  if (resource) {
    const { charityname } = resource;

    return <div>{charityname}</div>;
  }

  return null;
};

export default Resource;
