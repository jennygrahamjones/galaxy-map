import React, { Component } from "react";
import "./App.css";
import AutoComplete from "./AutoSuggest";
import { BaseMap } from "./components/map/BaseMap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planetData: ""
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Galaxy Map</h1>
          <>
            <AutoComplete />
          </>
        </header>
        <div id="planetData"></div>
        <BaseMap />
      </div>
    );
  }
}

export default App;
