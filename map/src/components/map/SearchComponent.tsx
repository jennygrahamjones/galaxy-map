import FuzzySearch from "fuzzy-search";
import React from "react";
import { Popup } from "react-leaflet";
import ReactLeafletSearch from "react-leaflet-search";

import { PlanetProperties, Planet } from "../../interfaces/planet.js";
import {
  coordinatesForPlanet,
  getDataForPlanetWithName,
  allPlanets
} from "../../utils/planets";
import PlanetData from "../PlanetData";

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
        const searcher = new FuzzySearch(allPlanets(), ["properties.name"], {
          caseSensitive: false,
          sort: true
        });
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
