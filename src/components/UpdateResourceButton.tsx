import React from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';

import { TResource } from '../types';
import { colors, font } from '../App.styles';
import getPreFilledLink from '../utils/getPreFilledLink';

const UpdateButton = styled(Button)`
  && {
    background: ${colors.orangePrimary};
    color: ${colors.black};
    font-family: ${font.families.openSans};
    font-size: ${font.helpers.convertPixelsToRems(16)};
    text-transform: none;
    &:hover {
      background: ${colors.orangeDark};
    }
  }
` as typeof Button;

interface Props {
  resourceId: string;
  resource: TResource;
}

const UpdateResourceButton = ({ resourceId, resource }: Props) => {
  return (
    <div>
      <UpdateButton
        variant="contained"
        href={getPreFilledLink(resourceId, resource)}
        target="_blank"
      >
        Request an Update
      </UpdateButton>
    </div>
  );
};

export default UpdateResourceButton;
