import { CRS } from "leaflet";
import React from "react";
import {
  GeoJSON,
  LayerGroup,
  LayersControl,
  Map,
  Marker,
  Tooltip
} from "react-leaflet";

import grid from "../../data/grid.json";
import hyperspace from "../../data/hyperspace.json";
import region from "../../data/region.json";
import sector from "../../data/sector.json";
import { iconForPlanet } from "../../icon";
import { GridSquare } from "../../interfaces/gridsquare.js";
import { Planet } from "../../interfaces/planet.js";
import { Region } from "../../interfaces/region.js";
import { Sector } from "../../interfaces/sector.js";
import { GridComponent } from "./GridComponent";
import { RegionComponent } from "./RegionComponent";
import { searchComponent } from "./SearchComponent";
import { SectorComponent } from "./SectorComponent";

export class BaseMap extends React.Component<{ onToolTipClick: any }> {
  state = {};

  examples: Planet[] = require("../../data/test.json");

  createMarkers = (canonOnly: number) => {
    return this.examples
      .filter(planet => planet.properties.canon === canonOnly)
      .map(planet => {
        const coords = planet.geometry.coordinates.reverse();
        const { name, uid } = planet.properties;
        const marker = (
          <Marker
            key={`marker-${uid}`}
            position={coords}
            title={name}
            icon={iconForPlanet(name)}>
            <Tooltip key={`tooltip-${uid}`}>{name}</Tooltip>
          </Marker>
        );
        return marker;
      });
  };

  createSectors() {
    const sectors: Sector[] = sector.features;
    return sectors.map(s => {
      const sec = <SectorComponent key={`sector-${s.properties.sid}`} {...s} />;
      return sec;
    });
  }

  createRegions() {
    const regions: Region[] = region.features;
    return regions.map(r => {
      const reg = <RegionComponent key={`region-${r.properties.rid}`} {...r} />;
      return reg;
    });
  }

  createGrid() {
    const gridSquares: GridSquare[] = grid.features;
    return gridSquares.map(g => {
      return <GridComponent key={`grid-${g.properties.grid}`} {...g} />;
    });
  }

  createHyperspace() {
    const hyperspaceRoutes = hyperspace.features;
    return hyperspaceRoutes.map(r => {
      return (
        <GeoJSON
          data={r}
          style={() => ({
            color: "white",
            weight: 2
          })}
          key={`route-${r.properties.hid}`}>
          <Tooltip sticky={true} permanent={false}>
            {r.properties.hyperspace}
          </Tooltip>
        </GeoJSON>
      );
    });
  }

  render() {
    return (
      <Map
        center={[0, 0]}
        zoom={3}
        maxZoom={10}
        crs={CRS.Simple}
        inertia={true}>
        {searchComponent({})}
        <LayersControl position="topright">
          {this.createMarkers(1)}
          <LayersControl.Overlay name="Legends planets" checked={true}>
            <LayerGroup> {this.createMarkers(0)}</LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Fan planets" checked={true}>
            <LayerGroup> {this.createMarkers(2)}</LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Hyperspace" checked={false}>
            <LayerGroup>{this.createHyperspace()}</LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Grid" checked={true}>
            <LayerGroup>{this.createGrid()}</LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay
            name="Planets"
            checked={false}></LayersControl.Overlay>
          <LayersControl.Overlay name="Galactic sectors" checked={false}>
            <LayerGroup>{this.createSectors()}</LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Galactic regions" checked={true}>
            <LayerGroup> {this.createRegions()}</LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </Map>
    );
  }
}
