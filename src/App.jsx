import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Shelters from './components/Shelters';
import Hygiene from './components/Hygiene';
import Hotlines from './components/Hotlines';
import Food from './components/Food';
import Transit from './components/Transit';
import Resource from './components/Resource';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
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
        </div>
      </Router>
    );
  }
}

export default App;
