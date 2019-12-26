import React, { useState } from "react";

import CategoryBanner from "./CategoryBanner";
import SearchResults from "./SearchResults";
import SubCategories from "./SubCategories";
import { TResourceCategory } from "../nativeTypes";
import { View } from "react-native";
import useSearchResults from "../useSearchResults";

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
  const searchHits = useSearchResults(searchQuery);
  const handleSubCategoryClick = (query: string) => updateSearchQuery(query);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "stretch",
      }}
    >
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
      <SearchResults searchHits={searchHits} />
    </View>
  );
};

export default CategoryResults;
