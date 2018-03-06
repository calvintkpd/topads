import React, { Component } from 'react';
import logo from './logo.svg';
import TopAds from './TopAds';
import './App.css';

class App extends Component {
  
  render() {
    var adQuery = {
      item: 2,
      src: "search",
      page: 1,
      user_id: 1667684,
      dep_id: 24,
      ep: "cpm",
      device: "mobile",
      template_id: "2,3,4",
      ad_url: "http://172.31.4.86:8765"
    };

    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Bro</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          This is our Fancy Component: 
          <TopAds type="banner" query={adQuery} lang="en"/>
      </div>
    );
  }
}

export default App;
