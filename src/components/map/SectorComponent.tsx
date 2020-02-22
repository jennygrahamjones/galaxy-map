import React from "react";
import { GeoJSON, Tooltip } from "react-leaflet";

import { Sector } from "../../interfaces/sector";
import { sectorColourByFaction, sectorFaction } from "../../utils/sectors";

export const SectorComponent = (inputSector: Sector) => {
  const { sector, sid } = inputSector.properties;
  const colour = sectorColourByFaction(inputSector.properties.sector);
  const faction = sectorFaction(sector);

  return (
    <GeoJSON
      key={`poly-${sid}`}
      style={() => ({
        stroke: true,
        color: colour,
        weight: 0.5,
        fill: true
      })}
      data={inputSector}>
      <Tooltip sticky={true} permanent={false} key={`tooltip-${sid}`}>
        {sector} {faction && `- ${faction}`}
      </Tooltip>
    </GeoJSON>
  );
};
