import React, { useState } from "react";
import { TResourceCategory } from "../types";
import { font } from "../App.styles";
import SubCategoryButton from "./SubCategoryButton";
import { ScrollView, View, Text } from "react-native";

interface Props {
  category: TResourceCategory;
  color: string;
  subCategories: TResourceCategory[];
  handleSubCategoryClick: Function;
}

// const SubCategoriesList = styled.ul`
//   display: flex;
//   flex-direction: row;
//   margin: 0 ${font.helpers.convertPixelsToRems(-subCategoryHorizontalSpacing)};
//   padding: ${font.helpers.convertPixelsToRems(20)} 0
//     ${font.helpers.convertPixelsToRems(10)};
//   width: auto;
// `;

// const SubCategoryItem = styled.li`
//   flex: 0 0 auto;
//   list-style-type: none;
//   margin: 0 ${font.helpers.convertPixelsToRems(subCategoryHorizontalSpacing)};
// `;

const SubCategories = ({
  category,
  color,
  handleSubCategoryClick,
  subCategories,
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

  const isSelected = (contextQuery: string) => {
    return contextQuery === selectedSubCategory.query;
  };

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      pinchGestureEnabled={false}>
      <View style={{ marginLeft: 8, marginRight: 8 }}>
        <SubCategoryButton
          text="All"
          buttonColor={isSelected(categoryQuery) ? color : "transparent"}
          onSubcategoryClick={() => handleClick(category)}
        />
      </View>
      {subCategories.map(subCategory => {
        const { text, query } = subCategory;
        const onSubcategoryClick = () => handleClick(subCategory);
        return (
          <View key={text} style={{ marginRight: 8 }}>
            <SubCategoryButton
              text={text}
              buttonColor={isSelected(query) ? color : "transparent"}
              onSubcategoryClick={onSubcategoryClick}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default SubCategories;
