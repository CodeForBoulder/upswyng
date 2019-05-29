import React from 'react';
import withResource from './withResource';
import { TResource } from '../types';

interface Props {
  resource: TResource;
}

const Shelters = (props: Props) => (
  <div>
    <p>Shelters</p>
    <p>{JSON.stringify(props.resource)}</p>
  </div>
);

export default withResource(Shelters, '/charity');
