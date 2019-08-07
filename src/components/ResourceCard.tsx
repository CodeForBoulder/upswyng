import React from 'react';
import { Link } from 'react-router-dom';
import { SEARCH_PARAM_RESOURCE } from '../constants';

interface Props {
  resourceId: string;
  resourceName: string;
}

const ResourceCard = ({ resourceId, resourceName }: Props) => (
  <Link
    to={{
      pathname: '/resource',
      search: `?${SEARCH_PARAM_RESOURCE}=${resourceId}`
    }}
  >
    <img src={'https://via.placeholder.com/150'} alt={'placeholder'} />
    {resourceName}
  </Link>
);

export default ResourceCard;
