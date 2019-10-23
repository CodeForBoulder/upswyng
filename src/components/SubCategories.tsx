import React, { useState } from 'react';
import { TResourceCategory, TResourceSubcategory } from '../types';
import styled from 'styled-components';
import { font } from '../App.styles';
import SubCategoryButton from './SubCategoryButton';

interface Props {
  category: TResourceCategory;
  color: string;
  subCategories: TResourceSubcategory[];
  handleSubCategoryClick: Function;
}

const subCategoryHorizontalSpacing = 5;

const SubCategoriesList = styled.ul`
  display: flex;
  flex-direction: row;
  margin: ${font.helpers.convertPixelsToRems(10)}
    ${font.helpers.convertPixelsToRems(-subCategoryHorizontalSpacing)} 0;
  overflow-x: scroll;
  padding: ${font.helpers.convertPixelsToRems(10)} 0
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
  const { stub: categoryStub } = category;
  const [selectedSubCategory, updateSelectedSubCategory] = useState<
    TResourceCategory | TResourceSubcategory
  >(category);

  const handleClick = (
    subCategory: TResourceCategory | TResourceSubcategory
  ) => {
    const { stub } = subCategory;
    updateSelectedSubCategory(subCategory);
    handleSubCategoryClick(stub);
  };

  return (
    <SubCategoriesList>
      <SubCategoryItem key={categoryStub}>
        <SubCategoryButton
          buttonColor={color}
          isSelected={selectedSubCategory.stub === categoryStub}
          onClick={() => handleClick(category)}
        >
          All
        </SubCategoryButton>
      </SubCategoryItem>
      {subCategories.map(subCategory => {
        const { text, stub } = subCategory;
        return (
          <SubCategoryItem key={stub}>
            <SubCategoryButton
              buttonColor={color}
              isSelected={selectedSubCategory.stub === stub}
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
