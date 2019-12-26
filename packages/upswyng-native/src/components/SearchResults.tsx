import { ActivityIndicator, ScrollView, View } from "react-native";

import { BoldText } from "./UpText";
import React from "react";
import ResourceCard from "./ResourceCard";
import { TSearchHit } from "../useSearchResults";
import TwoColumnLayout from "./TwoColumnLayout";
import { colors } from "../App.styles";

const ResourceGrid = (props: { resources: TSearchHit[] }) => {
  const items = props.resources
    .map(({ resourceName, objectId }) => {
      if (resourceName && objectId) {
        return (
          <View
            key={objectId}
            style={{
              height: 128,
            }}
          >
            <ResourceCard resourceId={objectId} resourceName={resourceName} />
          </View>
        );
      }
    })
    .filter(Boolean);
  return items.length ? (
    <ScrollView
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={true}
      pinchGestureEnabled={false}
      style={{ flex: 1 }}
    >
      <TwoColumnLayout items={items} />
    </ScrollView>
  ) : (
    <BoldText style={{ color: colors.white }}>
      No resources match your search
    </BoldText>
  );
};

interface Props {
  searchHits: TSearchHit[] | null;
}

const SearchResults = ({ searchHits }: Props) => {
  return searchHits ? (
    <ResourceGrid resources={searchHits} />
  ) : (
    <View
      style={{
        paddingTop: 32,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={colors.orangePrimary} />
    </View>
  );
};

export default SearchResults;
