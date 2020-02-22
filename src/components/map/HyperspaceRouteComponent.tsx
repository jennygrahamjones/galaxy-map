import React from "react";
import { GeoJSON, Tooltip } from "react-leaflet";

import { Hyperspace } from "../../interfaces/hyperspace";

export const HyperspaceRouteComponent = (input: Hyperspace) => {
  return (
    <GeoJSON
      data={input}
      style={() => ({
        color: "white",
        weight: 2
      })}
      key={`route-${input.properties.hid}`}>
      <Tooltip sticky={true} permanent={false}>
        {input.properties.hyperspace}
      </Tooltip>
    </GeoJSON>
  );
};
