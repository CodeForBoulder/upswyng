import React, { useState } from 'react';
import { TSubCategory } from '../types';
import Button from '@material-ui/core/Button';
import styled, { css } from 'styled-components';
import { colors, font } from '../App.styles';

interface Props {
  subCategories: TSubCategory[];
  handleSubCategoryClick: Function;
}

const subCategoryHorizontalSpacing = 10;

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
  }
` as typeof Button;

const SelectedSubCategoryButton = styled(Button)`
  && {
    ${baseButtonStyles}
    background:red;
  }
` as typeof Button;

const SubCategories = ({ handleSubCategoryClick, subCategories }: Props) => {
  const [selectedSubCategory, updateSelectedSubCategory] = useState<
    TSubCategory
  >(subCategories[0]);

  const handleClick = (subCategory: TSubCategory) => {
    const { query } = subCategory;
    updateSelectedSubCategory(subCategory);
    handleSubCategoryClick(query);
  };

  return (
    <SubCategoriesList>
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
