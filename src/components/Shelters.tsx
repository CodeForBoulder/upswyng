import React from 'react';
import withResource from './withResource';
import { TResource } from '../types';

type Props = { data: TResource };

const Shelters = (props: Props) => (
  <div>
    <p>Shelters</p>
    <p>{JSON.stringify(props.data)}</p>
  </div>
);

export default withResource(Shelters, '/charity');
