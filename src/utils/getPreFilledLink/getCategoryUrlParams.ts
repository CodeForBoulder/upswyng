import { TResource } from '../../types';
import { TCategoryQuestionMap } from './types';
import { categoryQuestionMaps } from './questionMaps';

import getQuestionUrlParam from './getQuestionUrlParam';

const getCategoryQuestionUrlParam = (
  categoryMap: TCategoryQuestionMap,
  resource: TResource
) => {
  const { questionNum, values } = categoryMap;
  const { charityname, description, servicetype } = resource;

  const matchedValues = values.filter(({ synonyms }) =>
    synonyms.find(synonym => {
      const lowerCaseSynonym = synonym.toLowerCase();
      return (
        charityname.toLowerCase().includes(lowerCaseSynonym) ||
        description.toLowerCase().includes(lowerCaseSynonym) ||
        servicetype.toLowerCase().includes(lowerCaseSynonym)
      );
    })
  );

  if (matchedValues.length) {
    const combinedValues = matchedValues
      .map(({ value }) => `${getQuestionUrlParam(questionNum, value, true)}`)
      .join('&');

    return combinedValues;
  }

  return '';
};

const getCategoryQuestionUrlParams = (resource: TResource) =>
  Object.entries(categoryQuestionMaps)
    .map(([_, categoryMap]) =>
      getCategoryQuestionUrlParam(categoryMap, resource)
    )
    .filter(value => value)
    .join('&');

export default getCategoryQuestionUrlParams;
