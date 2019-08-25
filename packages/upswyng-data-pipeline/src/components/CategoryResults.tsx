import React, { useState, useEffect } from "react";
import { TResourceCategory } from "../types";
import useSearchResults from "../useSearchResults";
import { View, BackHandler } from "react-native";
import CategoryBanner from "./CategoryBanner";
import SubCategories from "./SubCategories";
// import SubCategories from "./SubCategories";
// import SearchResults from "./SearchResults";

interface Props {
  category: TResourceCategory;
  color: string;
  subCategories: TResourceCategory[];
}

const CategoryResults = ({
  category,
  color: categoryColor,
  subCategories,
}: Props) => {
  const { text: categoryText, query: categoryQuery } = category;
  const [searchQuery, updateSearchQuery] = useState(categoryQuery);
  // const searchResults = useSearchResults(searchQuery);

  const handleSubCategoryClick = (query: string) => updateSearchQuery(query);

  return (
    <View
      style={{
        borderColor: "blue",
        borderWidth: 1,
        flex: 1,
        alignItems: "stretch",
      }}>
      <View style={{ marginBottom: 8 }}>
        <CategoryBanner text={categoryText} color={categoryColor} />
      </View>
      <View style={{ marginBottom: 8, marginLeft: -8, marginRight: -8 }}>
        <SubCategories
          category={category}
          subCategories={subCategories}
          color={categoryColor}
          handleSubCategoryClick={handleSubCategoryClick}
        />
      </View>
      {/* 
        <SearchResults results={searchResults} /> */}
    </View>
  );
};

export default CategoryResults;
