import React from 'react';
import { Button } from '@material-ui/core';

import { TResource } from '../types';
import getPreFilledLink from '../utils/getPreFilledLink';

interface Props {
  resource: TResource;
}

const UpdateResourceButton = ({ resource }: Props) => {
  return (
    <Button href={getPreFilledLink(resource)} target="_blank">
      Request an Update
    </Button>
  );
};

export default UpdateResourceButton;
