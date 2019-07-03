import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppContainer from './App.styles';
import Header from './components/Header';
import Home from './components/Home';
import Shelters from './components/Shelters';
import Hygiene from './components/Hygiene';
import Hotlines from './components/Hotlines';
import Food from './components/Food';
import Transit from './components/Transit';
import Resource from './components/Resource';
import SearchResults from './components/SearchResults';

class App extends Component {
  render() {
    return (
      <AppContainer>
        <Router>
          <div>
            <Header />
            <Route exact path="/" component={Home} />
            <Route exact path="/shelters" component={Shelters} />
            <Route exact path="/hygiene" component={Hygiene} />
            <Route exact path="/hotlines" component={Hotlines} />
            <Route exact path="/food" component={Food} />
            <Route exact path="/transit" component={Transit} />
            <Route exact path="/resource" component={Resource} />
            <Route exact path="/search" component={SearchResults} />
          </div>
        </Router>
      </AppContainer>
    );
  }
}

export default App;
