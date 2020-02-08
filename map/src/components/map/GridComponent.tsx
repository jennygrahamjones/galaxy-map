import { GridSquare } from "../../interfaces/gridsquare";
import React from "react";
import { GeoJSON } from "react-leaflet";

export const GridComponent = (input: GridSquare) => {
  return (
    <GeoJSON
      data={input}
      style={() => ({
        color: "#4a83ec",
        weight: 0.5
      })}
      key={`square-${input.properties.grid}`}
    />
  );
};
