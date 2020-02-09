import React from "react";
import { GeoJSON, Tooltip } from "react-leaflet";

import { Region } from "../../interfaces/region";

export const RegionComponent = (inputRegion: Region) => {
  const { region, rid } = inputRegion.properties;

  return (
    <GeoJSON
      key={`poly-${rid}`}
      style={() => ({
        stroke: true,
        color: "#4a83ec",
        weight: 0.5,
        fill: true
      })}
      data={inputRegion}>
      <Tooltip sticky={true} permanent={false} key={`tooltip-${rid}`}>
        {region}
      </Tooltip>
    </GeoJSON>
  );
};
