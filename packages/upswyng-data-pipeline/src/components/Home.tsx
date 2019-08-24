import React from "react";
import styled from "styled-components";
import HomeButtons from "./HomeButtons";
import { font } from "../App.styles";
// import SearchInput from "./SearchInput";
import AlgoliaSearchIcon from "../icons/AlgoliaSearch";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Linking, View } from "react-native";

const openAlgolia = () => {
  Linking.openURL("https://www.algolia.com");
};

const Home = () => (
  <View style={styles.container}>
    {/* <View>
      <SearchInput />
    </View> */}
    <HomeButtons />
    <View style={styles.footer}>
      <TouchableWithoutFeedback onPress={openAlgolia}>
        <View>
          <AlgoliaSearchIcon />
        </View>
      </TouchableWithoutFeedback>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
});

export default Home;
