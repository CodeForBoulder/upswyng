import React from "react";
import styled from "styled-components";
import HomeButtons from "./HomeButtons";
import { font } from "../App.styles";
// import SearchInput from "./SearchInput";
import AlgoliaSearchIcon from "../icons/AlgoliaSearch";
import { StyleSheet } from "react-native";
import { View } from "react-native";

// const ButtonGrid = styled.div`
//   && {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     grid-gap: ${font.helpers.convertPixelsToRems(8)};
//   }
// `;

const Home = () => (
  <View style={styles.container}>
    {/* <View>
      <SearchInput />
    </View> */}
    <HomeButtons />
    <View style={styles.footer}>
      <View>
        <AlgoliaSearchIcon />
      </View>
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
