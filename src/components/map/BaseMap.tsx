import React from "react";
import { LayerGroup, LayersControl, Map, Marker, Tooltip } from "react-leaflet";

import grid from "../../data/grid.json";
import hyperspace from "../../data/hyperspace.json";
import region from "../../data/region.json";
import sector from "../../data/sector.json";

import { GridSquare } from "../../interfaces/gridsquare";
import { Region } from "../../interfaces/region";
import { Sector } from "../../interfaces/sector";
import { Hyperspace } from "../../interfaces/hyperspace";
import { Planet } from "../../interfaces/planet";

import { GridComponent } from "./GridComponent";
import { RegionComponent } from "./RegionComponent";
import { searchComponent } from "./SearchComponent";
import { SectorComponent } from "./SectorComponent";
import { HyperspaceRouteComponent } from "./HyperspaceRouteComponent";
import { iconForPlanet } from "../../icon";

import MarkerClusterGroup from "react-leaflet-markercluster";
import { allPlanets } from "../../utils/planets";

import { createClusterCustomIcon } from "../../icon";

export class BaseMap extends React.Component {
  state = {};

  examples = allPlanets() as Planet[];

  createMarkers = () => {
    return this.examples.map(planet => {
      const { coordinates } = planet.geometry;
      const { name, uid } = planet.properties;
      const marker = (
        <Marker
          key={`marker-${uid}`}
          position={coordinates.reverse()}
          title={name}
          icon={iconForPlanet(name)}>
          <Tooltip key={`tooltip-${uid}`}>{name}</Tooltip>
        </Marker>
      );
      return marker;
    });
  };

  createSectors() {
    const sectors = sector.features as Sector[];
    return sectors.map(s => {
      const sec = <SectorComponent key={`sector-${s.properties.sid}`} {...s} />;
      return sec;
    });
  }

  createRegions() {
    const regions = region.features as Region[];
    return regions.map(r => {
      const reg = <RegionComponent key={`region-${r.properties.rid}`} {...r} />;
      return reg;
    });
  }

  createGrid() {
    const gridSquares = grid.features as GridSquare[];
    return gridSquares.map(g => {
      return <GridComponent key={`grid-${g.properties.grid}`} {...g} />;
    });
  }

  createHyperspace() {
    const hyperspaceRoutes = hyperspace.features as Hyperspace[];
    return hyperspaceRoutes.map(r => {
      return (
        <HyperspaceRouteComponent key={`route-${r.properties.hid}`} {...r} />
      );
    });
  }

  render() {
    return (
      <Map center={[0, 0]} zoom={3} maxZoom={10} inertia={true}>
        {searchComponent({})}
        <LayersControl position="topright">
          <MarkerClusterGroup
            iconCreateFunction={createClusterCustomIcon}
            maxClusterRadius={55}
            disableClusteringAtZoom={5}
            spiderLegPolylineOptions={{
              weight: 0,
              opacity: 0
            }}
            polygonOptions={{ weight: 0, opacity: 0 }}>
            {this.createMarkers()}
          </MarkerClusterGroup>
          <LayersControl.Overlay name="Hyperspace routes" checked={false}>
            <LayerGroup>{this.createHyperspace()}</LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Grid" checked={true}>
            <LayerGroup>{this.createGrid()}</LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name=" Sectors" checked={true}>
            <LayerGroup>{this.createSectors()}</LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Regions" checked={false}>
            <LayerGroup> {this.createRegions()}</LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </Map>
    );
  }
}
