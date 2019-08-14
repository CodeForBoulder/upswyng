import React, { useState } from 'react';
import { TResourceCategory } from '../types';
import styled from 'styled-components';
import { font } from '../App.styles';
import SubCategoryButton from './SubCategoryButton';

interface Props {
  category: TResourceCategory;
  color: string;
  subCategories: TResourceCategory[];
  handleSubCategoryClick: Function;
}

const subCategoryHorizontalSpacing = 5;

const SubCategoriesList = styled.ul`
  display: flex;
  flex-direction: row;
  margin: 0 ${font.helpers.convertPixelsToRems(-subCategoryHorizontalSpacing)};
  padding: ${font.helpers.convertPixelsToRems(20)} 0
    ${font.helpers.convertPixelsToRems(10)};
  width: auto;
`;

const SubCategoryItem = styled.li`
  flex: 0 0 auto;
  list-style-type: none;
  margin: 0 ${font.helpers.convertPixelsToRems(subCategoryHorizontalSpacing)};
`;

const SubCategories = ({
  category,
  color,
  handleSubCategoryClick,
  subCategories
}: Props) => {
  const { query: categoryQuery } = category;
  const [selectedSubCategory, updateSelectedSubCategory] = useState<
    TResourceCategory
  >(category);

  const handleClick = (subCategory: TResourceCategory) => {
    const { query } = subCategory;
    updateSelectedSubCategory(subCategory);
    handleSubCategoryClick(query);
  };

  return (
    <SubCategoriesList>
      <SubCategoryItem key={categoryQuery}>
        <SubCategoryButton
          buttonColor={color}
          isSelected={selectedSubCategory.query === categoryQuery}
          onClick={() => handleClick(category)}
        >
          All
        </SubCategoryButton>
      </SubCategoryItem>
      {subCategories.map(subCategory => {
        const { text, query } = subCategory;
        return (
          <SubCategoryItem key={query}>
            <SubCategoryButton
              buttonColor={color}
              isSelected={selectedSubCategory.query === query}
              onClick={() => handleClick(subCategory)}
            >
              {text}
            </SubCategoryButton>
          </SubCategoryItem>
        );
      })}
    </SubCategoriesList>
  );
};

export default SubCategories;
