import "./App.css";

import React, { Component } from "react";

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
        <BaseMap onToolTipClick={this.setPlanetData} />
      </div>
    );
  }
}

export default App;
