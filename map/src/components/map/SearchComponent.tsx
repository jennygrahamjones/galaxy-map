import React from "react";
import FuzzySearch from "fuzzy-search";
import planetsGeo from "../../data/planetsGeo.json";
import ReactLeafletSearch from "react-leaflet-search";
import {
  coordinatesForPlanet,
  getDataForPlanetWithName
} from "../../utils/planets";
import { Popup } from "react-leaflet";
import PlanetData from "../PlanetData";
import { PlanetProperties } from "../../interfaces/planet.js";

const myPopup = search => {
  const data: PlanetProperties = getDataForPlanetWithName(search.info);
  return (
    <Popup>
      <PlanetData {...data} />
    </Popup>
  );
};

export const searchComponent = props => (
  <ReactLeafletSearch
    {...props}
    position="topleft"
    inputPlaceholder="Enter a planet name..."
    popUp={myPopup}
    search={[0, 0]}
    zoom={5}
    showMarker={true}
    showPopup={true}
    openSearchOnLoad={false}
    closeResultsOnClick={true}
    customProvider={{
      search: (searchString: string) => {
        const searcher = new FuzzySearch(
          planetsGeo.features,
          ["properties.name"],
          {
            caseSensitive: false,
            sort: true
          }
        );
        const result = searcher.search(searchString);
        const possiblePlanets = result.map(r => r.properties.name);

        const searchResults = possiblePlanets.map(planet => {
          return {
            longitude: coordinatesForPlanet(planet)[0],
            latitude: coordinatesForPlanet(planet)[1],
            name: planet
          };
        });

        if (possiblePlanets) {
          return {
            info: searchResults
          };
        }
      }
    }}
  />
);
