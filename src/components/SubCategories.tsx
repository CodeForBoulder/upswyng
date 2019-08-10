import React from 'react';
import { TSubCategory } from '../types';

interface Props {
  subCategories: TSubCategory[];
  handleSubCategoryClick: Function;
}

const SubCategories = ({ subCategories, handleSubCategoryClick }: Props) => (
  <ul>
    {subCategories.map(({ text, query }) => (
      <li key={query} onClick={() => handleSubCategoryClick(query)}>
        {text}
      </li>
    ))}
  </ul>
);

export default SubCategories;
