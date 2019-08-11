import React, { useState } from 'react';
import { TSubCategory } from '../types';
import Button from '@material-ui/core/Button';
import styled, { css } from 'styled-components';
import { darken } from 'polished';
import { colors, font } from '../App.styles';

interface Props {
  category: TSubCategory;
  color: string;
  subCategories: TSubCategory[];
  handleSubCategoryClick: Function;
}

const subCategoryHorizontalSpacing = 5;

const SubCategoriesList = styled.ul`
  display: flex;
  flex-direction: row;
  margin: 0 ${font.helpers.convertPixelsToRems(-subCategoryHorizontalSpacing)};
  overflow-y: scroll;
  padding: ${font.helpers.convertPixelsToRems(20)} 0
    ${font.helpers.convertPixelsToRems(10)};
  width: auto;
`;

const SubCategoryItem = styled.li`
  flex: 0 0 auto;
  list-style-type: none;
  margin: 0 ${font.helpers.convertPixelsToRems(subCategoryHorizontalSpacing)};
`;

const baseButtonStyles = css`
  color: ${colors.white};
  font-family: ${font.families.openSans};
  font-size: ${font.helpers.convertPixelsToRems(16)};
  text-transform: none;
`;

const SubCategoryButton = styled(Button)`
  && {
    ${baseButtonStyles}
    &:hover,&:focus {
      background: ${darken(0.05, colors.charcoal)};
    }
  }
` as typeof Button;

const SubCategories = ({
  category,
  color,
  handleSubCategoryClick,
  subCategories
}: Props) => {
  const { query: categoryQuery } = category;
  const [selectedSubCategory, updateSelectedSubCategory] = useState<
    TSubCategory
  >(category);

  const SelectedSubCategoryButton = styled(Button)`
    && {
      ${baseButtonStyles}
      background: ${color};
      &:hover,
      &:focus {
        background: ${darken(0.1, color)};
      }
    }
  ` as typeof Button;

  const handleClick = (subCategory: TSubCategory) => {
    const { query } = subCategory;
    updateSelectedSubCategory(subCategory);
    handleSubCategoryClick(query);
  };

  return (
    <SubCategoriesList>
      <SubCategoryItem key={categoryQuery}>
        {selectedSubCategory.query === categoryQuery ? (
          <SelectedSubCategoryButton onClick={() => handleClick(category)}>
            All
          </SelectedSubCategoryButton>
        ) : (
          <SubCategoryButton onClick={() => handleClick(category)}>
            All
          </SubCategoryButton>
        )}
      </SubCategoryItem>
      {subCategories.map(subCategory => {
        const { text, query } = subCategory;
        return (
          <SubCategoryItem key={query}>
            {selectedSubCategory.query === query ? (
              <SelectedSubCategoryButton
                onClick={() => handleClick(subCategory)}
              >
                {text}
              </SelectedSubCategoryButton>
            ) : (
              <SubCategoryButton onClick={() => handleClick(subCategory)}>
                {text}
              </SubCategoryButton>
            )}
          </SubCategoryItem>
        );
      })}
    </SubCategoriesList>
  );
};

export default SubCategories;
