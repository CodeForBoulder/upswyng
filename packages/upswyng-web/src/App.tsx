import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import About from "./components/About";
import { BannerColorContextProvider } from "./components/BannerColorContext";
import Categories from "./components/Categories";
import CoordinatedEntry from "./components/CoordinatedEntry";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header";
import Home from "./components/Home";
import Hotlines from "./components/Hotlines";
import { LastLocationProvider } from "react-router-last-location";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ReportIssue from "./components/ReportIssue";
import Resource from "./components/Resource";
import Search from "./components/Search";
import TermsOfUse from "./components/TermsOfUse";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

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

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <LastLocationProvider>
            <BannerColorContextProvider>
              <Header />
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route path="/coordinated-entry" component={CoordinatedEntry} />
              <Route path="/shelters" component={Shelters} />
              <Route path="/job-training" component={JobTraining} />
              <Route path="/health" component={Health} />
              <Route path="/hygiene" component={Hygiene} />
              <Route exact path="/hotlines" component={Hotlines} />
              <Route path="/food" component={Food} />
              <Route exact path="/privacy-policy" component={PrivacyPolicy} />
              <Route path="/transit" component={Transit} />
              <Route exact path="/resource/:resourceId" component={Resource} />
              <Route path="/resources" component={Resources} />
              <Route path="/social_services" component={SocialServices} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/terms-of-use" component={TermsOfUse} />
              <Route path="/wifi" component={Wifi} />
              <Route
                exact
                path="/report-issue/:resourceId"
                component={ReportIssue}
              />
            </BannerColorContextProvider>
          </LastLocationProvider>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
