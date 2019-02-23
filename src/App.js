import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
      </Router>
    );
  }
}

const Home = () => (
  <div className="home">
    <h1>upswyng</h1>
    <p>Home placeholder</p>
  </div>
);

export default App;
