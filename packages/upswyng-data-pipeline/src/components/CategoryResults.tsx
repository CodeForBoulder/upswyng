import React, { useState, useEffect } from "react";
import { TResourceCategory } from "../types";
import useSearchResults from "../useSearchResults";
import { View, BackHandler } from "react-native";
import CategoryBanner from "./CategoryBanner";
// import CategoryBanner from "./CategoryBanner";
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
  //   const [searchQuery, updateSearchQuery] = useState(categoryQuery);
  //   const searchResults = useSearchResults(searchQuery);

  //   const handleSubCategoryClick = (query: string) => updateSearchQuery(query);

  return (
    <View
      style={{
        borderColor: "blue",
        borderWidth: 1,
        flex: 1,
        alignItems: "stretch",
      }}>
      <CategoryBanner text={categoryText} color={categoryColor} />
      {/* <SubCategories
          category={category}
          color={categoryColor}
          subCategories={subCategories}
          handleSubCategoryClick={handleSubCategoryClick}
        />
        <SearchResults results={searchResults} /> */}
    </View>
  );
};

export default CategoryResults;
