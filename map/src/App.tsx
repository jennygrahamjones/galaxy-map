import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AutoComplete from "./AutoSuggest";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <AutoComplete />
      </header>
    </div>
  );
};

export default App;
