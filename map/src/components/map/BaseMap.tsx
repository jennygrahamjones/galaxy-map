import {
  Map,
  LayersControl,
  Marker,
  Tooltip,
  LayerGroup,
  GeoJSON
} from "react-leaflet";
import React from "react";
import region from "../../data/region.json";
import sector from "../../data/sector.json";
import grid from "../../data/grid.json";
import hyperspace from "../../data/hyperspace.json";
import { CRS } from "leaflet";
import { Planet } from "../../interfaces/planet.js";
import { Region } from "../../interfaces/region.js";
import { Sector } from "../../interfaces/sector.js";
import { GridSquare } from "../../interfaces/gridsquare.js";
import { SectorComponent } from "./SectorComponent";
import { RegionComponent } from "./RegionComponent";
import { GridComponent } from "./GridComponent";
import { iconForPlanet } from "../../icon";

export class BaseMap extends React.Component<{ onToolTipClick: any }> {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 3
  };

  examples: Planet[] = require("../../data/test.json");

  createMarkers() {
    return this.examples.map(planet => {
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
  }

  createSectors() {
    const sectors: Sector[] = sector.features;
    return sectors.map(s => {
      const sec = <SectorComponent {...s} />;
      return sec;
    });
  }

  createRegions() {
    const regions: Region[] = region.features;
    return regions.map(r => {
      const reg = <RegionComponent {...r} />;
      return reg;
    });
  }

  createGrid() {
    const gridSquares: GridSquare[] = grid.features;
    return gridSquares.map(g => {
      return <GridComponent {...g} />;
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
        inertia={true}
        onzoomend={() => console.log("zoom")}>
        <LayersControl position="topright">
          {this.createMarkers()}
          <LayersControl.Overlay name="Hyperspace" checked={false}>
            <LayerGroup>{this.createHyperspace()}</LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Grid" checked={false}>
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
