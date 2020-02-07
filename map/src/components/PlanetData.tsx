import React from "react";
import styled from "styled-components";
import { numberWithCommas } from "../utils/common";

const PlanetDataContainer = styled.div`
  border-color: white;
  border-style: solid;
  border-width: 2px;
  width: fit-content;
  padding: 10px;
  font-size: 0.5em;
  margin: 10px;
  h2 {
    background: ${props => (props.factionColor ? props.factionColor : "black")};
  }
  a {
    color: white;
  }
  span {
    font-weight: bold;
  }
`;

const PlanetData = props => {
  const { name, sector, region, link, grid } = props.planetData;
  const { factionName, type, colour } = props.factionData;
  const { climate, terrain, population } = props.planetFeatures;

  const hasSubFactions = props.subFactionData.length > 0;

  return (
    <PlanetDataContainer factionColor={colour}>
      <h2>
        {name} {grid && "| " + grid}
      </h2>
      {factionName && (
        <p>
          <span>Held by:</span> {factionName}
        </p>
      )}
      {hasSubFactions && (
        <div>
          <span>Factions represented:</span>
          <ul>
            {props.subFactionData.map(faction => {
              const keyId = props.subFactionData.indexOf(faction);
              return (
                <li className="sub-faction" key={keyId}>
                  {faction.factionName}
                </li>
              );
            })}
          </ul>
        </div>
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
