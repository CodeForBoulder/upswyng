import React from 'react';
import { TResource } from '../types';
interface Props {
  id: string;
  resource: TResource;
}

const Resource = (props: Props) => {
  const {
    resource: { charityName }
  } = props;

  return <div>{charityName}</div>;
};

export default Resource;
