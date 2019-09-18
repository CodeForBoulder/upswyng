import React from 'react';
import { Button } from '@material-ui/core';

import { TResource } from '../types';
import getPreFilledLink from '../utils/getPreFilledLink';

interface Props {
  resourceId: string;
  resource: TResource;
}

const UpdateResourceButton = ({ resourceId, resource }: Props) => {
  return (
    <Button href={getPreFilledLink(resourceId, resource)} target="_blank">
      Request an Update
    </Button>
  );
};

export default UpdateResourceButton;
