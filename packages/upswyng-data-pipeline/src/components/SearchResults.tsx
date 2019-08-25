import React from "react";
import { Response } from "algoliasearch";
import { font, colors } from "../App.styles";
import ResourceCard from "./ResourceCard";
import { View, ScrollView, ActivityIndicator } from "react-native";
import TwoColumnLayout from "./TwoColumnLayout";

interface Props {
  results: Response | null;
}

const SearchResults = ({ results }: Props) => {
  if (results) {
    const { hits } = results;
    if (hits && hits.length) {
      const listItems = hits.map(({ charityname, objectID }) => {
        if (charityname && objectID) {
          return (
            <View
              key={objectID}
              style={{
                height: 128,
              }}>
              <ResourceCard resourceId={objectID} resourceName={charityname} />
            </View>
          );
        }
      });
      return (
        <ScrollView
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={true}
          pinchGestureEnabled={false}
          style={{ flex: 1 }}>
          <TwoColumnLayout items={listItems} />
        </ScrollView>
      );
    }
    // TODO: Add message when there are no matching results
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={colors.orangePrimary} />
    </View>
  );
};

export default SearchResults;
