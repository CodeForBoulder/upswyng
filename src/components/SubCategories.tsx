import React from 'react';
import { TSubCategory } from '../types';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { colors, font } from '../App.styles';

interface Props {
  defaultQuery: string;
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

const SubCategoryButton = styled(Button)`
  && {
    color: ${colors.white};
    font-family: ${font.families.openSans};
    font-size: ${font.helpers.convertPixelsToRems(16)};
    text-transform: none;
  }
` as typeof Button;

const SubCategories = ({
  defaultQuery,
  handleSubCategoryClick,
  subCategories
}: Props) => (
  <SubCategoriesList>
    <SubCategoryItem key={defaultQuery}>
      <SubCategoryButton onClick={() => handleSubCategoryClick(defaultQuery)}>
        All
      </SubCategoryButton>
    </SubCategoryItem>
    {subCategories.map(({ text, query }) => (
      <SubCategoryItem key={query}>
        <SubCategoryButton onClick={() => handleSubCategoryClick(query)}>
          {text}
        </SubCategoryButton>
      </SubCategoryItem>
    ))}
  </SubCategoriesList>
);

export default SubCategories;
