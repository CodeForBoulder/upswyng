import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
  BackHandler,
  NativeEventSubscription,
} from "react-native";
import {
  NativeRouter,
  Route,
  Switch,
  withRouter,
  RouteComponentProps,
} from "react-router-native";
import Home from "./src/components/Home";
import Categories from "./src/components/Categories";
import { colors } from "./src/App.styles";
import Header from "./src/components/Header";

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

const AppContents = withRouter((props: RouteComponentProps) => {
  let listener: NativeEventSubscription | null;
  useEffect(() => {
    // Make the Android back button make React Router go back
    listener && listener.remove();
    listener = BackHandler.addEventListener("hardwareBackPress", () => {
      if (props.location.pathname === "/") {
        return false;
      }
      props.history.goBack();
      return true;
    });
    return () => {
      listener && listener.remove();
    };
  }, [props.location.pathname]);

  return (
    <View style={styles.container}>
      <Header />
      <Route exact path="/" component={Home} />
      <Switch>
        <Route path="/shelters" component={Shelters} />
        <Route path="/job-training" component={JobTraining} />
        <Route path="/health" component={Health} />
        <Route path="/hygiene" component={Hygiene} />
        {/* <Route  path="/hotlines" component={Hotlines} /> */}
        <Route path="/food" component={Food} />
        <Route path="/transit" component={Transit} />
        {/* <Route  path="/resource" component={Resource} /> */}
        <Route path="/resources" component={Resources} />
        <Route path="/social-services" component={SocialServices} />
        {/* <Route  path="/search" component={Search} /> */}
        <Route path="/wifi" component={Wifi} />
      </Switch>
    </View>
  );
});

export default function App() {
  return (
    <NativeRouter>
      <AppContents />
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight,
    flex: 1,
    backgroundColor: colors.charcoal,
    alignItems: "stretch",
    justifyContent: "center",
    paddingLeft: 8,
    paddingRight: 8,
  },
});
