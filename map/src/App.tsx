import React, { Component } from "react";
import "./App.css";
import AutoComplete from "./AutoSuggest";
import { BaseMap } from "./components/map/BaseMap";
import { PlanetProperties } from "./interfaces/planet";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planetData: {} as PlanetProperties
    };
  }

  setPlanetData = (planet: PlanetProperties) => {
    this.setState({ planetData: planet, value: planet.name });
  };

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <h1>Galaxy Map</h1>
          <AutoComplete />
        </header> */}
        <div id="planetData"></div>
        <BaseMap onToolTipClick={this.setPlanetData} />
      </div>
    );
  }
}

export default App;
