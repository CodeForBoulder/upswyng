import React from "react";
import { Response } from "algoliasearch";
import { font } from "../App.styles";
import ResourceCard from "./ResourceCard";
import { View } from "react-native";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  results: Response | null;
}

// const SearchResultsList = styled.ul`
//   align-items: stretch;
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   margin: 0 ${font.helpers.convertPixelsToRems(-8)};
//   padding: 0;
//   width: auto;
// `;

// const SearchResultsItem = styled.li`
//   align-items: stretch;
//   display: flex;
//   flex: 0 1 50%;
//   list-style-type: none;
//   padding: ${font.helpers.convertPixelsToRems(8)};
// `;

const SearchResults = ({ results }: Props) => {
  if (results) {
    const { hits } = results;
    if (hits && hits.length) {
      const listItems = hits.map(({ charityname, objectID }) => {
        if (charityname && objectID) {
          return (
            <View key={objectID} style={{ width: 120, height: 90 }}>
              <ResourceCard resourceId={objectID} resourceName={charityname} />
            </View>
          );
        }
      });
      return <View style={{ flex: 1 }}>{listItems}</View>;
    }
    // TODO: Add message when there are no matching results
  }
  return <LoadingSpinner />;
};

export default SearchResults;
