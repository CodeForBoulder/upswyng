import React from "react";
import { StyleSheet, View, StatusBar, Platform } from "react-native";
import { NativeRouter, Route } from "react-router-native";
import Home from "./src/components/Home";
import Categories from "./src/components/Categories";
// import Hotlines from "./src/components/Hotlines";
// import Resource from "./src/components/Resource";
// import Search from "./src/components/Search";

const {
  Food,
  Health,
  Hygiene,
  JobTraining,
  Resources,
  Shelters,
  SocialServices,
  Transit,
  Wifi,
} = Categories;

export default function App() {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <Route exact path="/" component={Home} />
        <Route exact path="/shelters" component={Shelters} />
        <Route exact path="/job-training" component={JobTraining} />
        <Route exact path="/health" component={Health} />
        <Route exact path="/hygiene" component={Hygiene} />
        {/* <Route exact path="/hotlines" component={Hotlines} /> */}
        <Route exact path="/food" component={Food} />
        <Route exact path="/transit" component={Transit} />
        {/* <Route exact path="/resource" component={Resource} /> */}
        <Route exact path="/resources" component={Resources} />
        <Route exact path="/social-services" component={SocialServices} />
        {/* <Route exact path="/search" component={Search} /> */}
        <Route exact path="/wifi" component={Wifi} />
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
