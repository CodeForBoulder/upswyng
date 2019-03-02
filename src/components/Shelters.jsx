import React from 'react';
import withData from './withData';

const Shelters = props => (
  <div>
    <p>Shelters</p>
    <p>{JSON.stringify(props.data)}</p>
  </div>
);

export default withData(Shelters, '/charity');
