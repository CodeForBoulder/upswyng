import React from "react";
import styled from "styled-components";
import HomeButtons from "./HomeButtons";
import { font } from "../App.styles";
// import SearchInput from "./SearchInput";
// import AlgoliaBadge from "./AlgoliaBadge";
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
    <View>
      <HomeButtons />
    </View>
    <View>
      {/* <View>
        <a href="https://www.netlify.com">
          <img
            src="https://www.netlify.com/img/global/badges/netlify-light.svg"
            alt="deploys by Netlify"
          />
        </a>
      </View> */}
    </View>
    <View>
      {/* <View>
        <a href="https://www.algolia.com/">
          <AlgoliaBadge />
        </a>
      </View> */}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { paddingLeft: 12, paddingRight: 12 },
});

export default Home;
