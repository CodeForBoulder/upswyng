import React from 'react';
import { Button } from '@material-ui/core';

import { TResource } from '../types';
import generatePreFilledLink from '../utils/generatePreFilledLink';

interface Props {
  resource: TResource;
}

const UpdateResourceButton = ({ resource }: Props) => {
  return (
    <Button href={generatePreFilledLink(resource)} target="_blank">
      Request an Update
    </Button>
  );
};

export default UpdateResourceButton;
