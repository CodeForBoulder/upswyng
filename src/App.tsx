import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GlobalStyle from './App.styles';
import About from './components/About';
import { BannerColorContextProvider } from './components/BannerColorContext';
import Categories from './components/Categories';
import Header from './components/Header';
import Home from './components/Home';
import Hotlines from './components/Hotlines';
import PrivacyPolicy from './components/PrivacyPolicy';
import Resource from './components/Resource';
import Search from './components/Search';
import TermsOfUse from './components/TermsOfUse';

const {
  Food,
  Health,
  Hygiene,
  JobTraining,
  Resources,
  Shelters,
  SocialServices,
  Transit,
  Wifi
} = Categories;

class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <Router>
          <BannerColorContextProvider>
            <Header />
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route path="/shelters" component={Shelters} />
            <Route path="/job_training" component={JobTraining} />
            <Route path="/health" component={Health} />
            <Route path="/hygiene" component={Hygiene} />
            <Route exact path="/hotlines" component={Hotlines} />
            <Route path="/food" component={Food} />
            <Route exact path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/transit" component={Transit} />
            <Route exact path="/resource" component={Resource} />
            <Route path="/resources" component={Resources} />
            <Route path="/social_services" component={SocialServices} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/terms-of-use" component={TermsOfUse} />
            <Route path="/wifi" component={Wifi} />
          </BannerColorContextProvider>
        </Router>
      </>
    );
  }
}

export default App;
