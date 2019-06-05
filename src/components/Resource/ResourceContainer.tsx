import React from 'react';
import withResource from '../withResource';

const ResourceContainer = () => {
  const currentSearchParams = new URLSearchParams(location.search);
  const currentResourceId = currentSearchParams.get('id');

  if (currentResourceId) {
    const dataPath = `firebase-data-ref-path/${currentResourceId}`;
    return <withResource dataPath={dataPath} />;
  }

  return null;
};

export default ResourceContainer;
