import { Link, useParams } from "react-router-dom";
import { TResourceCategory, TResourceSubcategory } from "../webTypes";

import React from "react";
import SubCategoryButton from "./SubCategoryButton";
import { font } from "../App.styles";
import styled from "styled-components";

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

const SubCategoryLink = styled(Link)`
  &:link,
  &:visited,
  &:hover,
  &:active {
    text-decoration: none;
  }
`;

const SubCategories = ({ category, color, subCategories }: Props) => {
  const params = useParams<{ subcategory?: string }>();

  const { stub: categoryStub } = category;

  const currentSubCategoryStub = params.subcategory ? params.subcategory : null;

  return (
    <SubCategoriesList>
      <SubCategoryItem>
        <SubCategoryLink to={`/${categoryStub}`}>
          <SubCategoryButton
            buttonColor={color}
            isSelected={!currentSubCategoryStub}
          >
            All
          </SubCategoryButton>
        </SubCategoryLink>
      </SubCategoryItem>
      {subCategories.map(subCategory => {
        const { text, stub: subcategoryStub } = subCategory;
        return (
          <SubCategoryItem key={subcategoryStub}>
            <SubCategoryLink to={`/${categoryStub}/${subcategoryStub}`}>
              <SubCategoryButton
                buttonColor={color}
                isSelected={currentSubCategoryStub === subcategoryStub}
              >
                {text}
              </SubCategoryButton>
            </SubCategoryLink>
          </SubCategoryItem>
        );
      })}
    </SubCategoriesList>
  );
};

export default SubCategories;
