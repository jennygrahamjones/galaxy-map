import React, { Component } from "react";
import "./App.css";
import AutoComplete from "./AutoSuggest";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planetData: ""
    };
  }

  displayData = (nameOfPlanet: string) => {
    this.setState({ planetData: nameOfPlanet });
  };

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
      </div>
    );
  }
}

export default App;
