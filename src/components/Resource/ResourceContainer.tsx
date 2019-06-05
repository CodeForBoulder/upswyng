import withResource from '../withResource';
import Resource from './Resource';

const ResourceContainer = () => {
  const currentSearchParams = new URLSearchParams(location.search);
  const currentResourceId = currentSearchParams.get('id');

  if (currentResourceId) {
    const dataPath = `firebase-data-ref-path/${currentResourceId}`;
    return withResource(Resource, dataPath);
  }

  return null;
};

export default ResourceContainer;
