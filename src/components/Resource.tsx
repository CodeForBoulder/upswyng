import React from 'react';
import { TResource } from '../types';
interface Props {
  id: string;
  resource: TResource;
}

const Resource = (props: Props) => {
  const {
    resource: { charityname }
  } = props;
  return <div>{charityname}</div>;
};

export default Resource;
