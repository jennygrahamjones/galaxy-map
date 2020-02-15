import React from "react";
import styled from "styled-components";

import { PlanetProperties } from "../interfaces/planet";
import { numberWithCommas } from "../utils/common";
import {
  featuresOfPlanet,
  findFactionForPlanetWithName
} from "../utils/planets";

const PlanetDataContainer = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 5px;
  font-size: 1em;
  p {
    margin: 0;
  }
  a {
    color: white;
  }
  span {
    font-weight: bold;
  }
`;

const PlanetData = (planet: PlanetProperties) => {
  const { name, sector, region, link, grid } = planet;
  const { factionName, colour } = findFactionForPlanetWithName(name);
  const { climate, terrain, population } = featuresOfPlanet(name);

  // const subFactionData = findSubFactionsForPlanetWithName(name);
  // const hasSubFactions = findSubFactionsForPlanetWithName(name)
  //   ? this.subFactionData(name).length > 0
  //   : false;

  return (
    <PlanetDataContainer factionColor={colour}>
      <h2>
        {name} {grid && "- " + grid}
      </h2>
      {factionName && (
        <p>
          <span>Held by:</span> {factionName}
        </p>
      )}
      {sector && (
        <p>
          <span>Sector:</span> {sector}
        </p>
      )}
      {region && (
        <p>
          <span>Region:</span> {region}
        </p>
      )}
      {population && (
        <p>
          <span>Population:</span> {numberWithCommas(population)}
        </p>
      )}
      {climate && (
        <p>
          <span>Climate:</span> {climate}
        </p>
      )}
      {terrain && (
        <p>
          <span>Terrain:</span> {terrain}
        </p>
      )}
      {link && (
        <p>
          <a href={link}>Wookieepedia</a>
        </p>
      )}
    </PlanetDataContainer>
  );
};

export default PlanetData;
