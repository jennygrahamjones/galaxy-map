import React from "react";
import Autosuggest from "react-autosuggest";
import PlanetData from "./components/PlanetData";
import {
  getDataForPlanetWithName,
  fullListOfPlanetNames
} from "./utils/planets";
import styled from "styled-components";
import { PlanetProperties } from "./interfaces/planet";

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value: string) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : fullListOfPlanetNames.filter(
        name => name.toLowerCase().slice(0, inputLength) === inputValue
      );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion;

const ResultButton = styled.button`
  font-size: 0.5em;
  margin: 0.4em;
  padding: 0.25em 1em;
  border-radius: 3px;
  color: white;
  background-color: #282c34;
  :hover {
    background-color: #474b52;
  }
`;

export default class AutoComplete extends React.Component {
  // Autosuggest is a controlled component.
  // This means that you need to provide an input value
  // and an onChange handler that updates this value (see below).
  // Suggestions also need to be provided to the Autosuggest,
  // and they are initially empty because the Autosuggest is closed.
  state = {
    value: "",
    suggestions: [],
    planetData: {} as PlanetProperties
  };

  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => {
    const planetData: PlanetProperties = getDataForPlanetWithName(suggestion);
    return (
      <>
        <ResultButton
          onClick={() => {
            this.setState({ planetData: planetData });
          }}>
          {suggestion}
        </ResultButton>
      </>
    );
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
      planetData: {}
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  clearPlanetData = () => {
    this.setState({
      planetData: {}
    });
  };

  render() {
    const { value, suggestions, planetData } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Type a planet's name...",
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
        {this.state.planetData.name && (
          <div id="result">
            <PlanetData {...planetData} />
          </div>
        )}
      </>
    );
  }
}
