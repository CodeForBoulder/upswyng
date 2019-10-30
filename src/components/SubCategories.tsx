import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { TResourceCategory, TResourceSubcategory } from '../types';
import styled from 'styled-components';
import { font } from '../App.styles';
import SubCategoryButton from './SubCategoryButton';

interface Props {
  category: TResourceCategory;
  color: string;
  subCategories: TResourceSubcategory[];
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

const SubCategories = ({ category, color, subCategories }: Props) => {
  const params = useParams<{ subcategory?: string }>();

  const { stub: categoryStub } = category;

  const currentSubCategoryStub = params.subcategory ? params.subcategory : null;

  return (
    <SubCategoriesList>
      <SubCategoryItem>
        <Link to={`/${categoryStub}`}>
          <SubCategoryButton
            buttonColor={color}
            isSelected={!currentSubCategoryStub}
          >
            All
          </SubCategoryButton>
        </Link>
      </SubCategoryItem>
      {subCategories.map(subCategory => {
        const { text, stub: subcategoryStub } = subCategory;
        return (
          <SubCategoryItem key={subcategoryStub}>
            <Link to={`/${categoryStub}/${subcategoryStub}`}>
              <SubCategoryButton
                buttonColor={color}
                isSelected={currentSubCategoryStub === subcategoryStub}
              >
                {text}
              </SubCategoryButton>
            </Link>
          </SubCategoryItem>
        );
      })}
    </SubCategoriesList>
  );
};

export default SubCategories;
