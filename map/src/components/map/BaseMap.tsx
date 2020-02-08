import { GeoJSON, Map, LayersControl, Marker, Tooltip } from "react-leaflet";
import React from "react";
import region from "../../data/region.json";
import sector from "../../data/sector.json";
import grid from "../../data/grid.json";
import { CRS } from "leaflet";
import { Planet } from "../../interfaces/planet.js";

export class BaseMap extends React.Component<{ onToolTipClick: any }> {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13
  };

  examples: Planet[] = [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [47.614235, 14.680767] },
      properties: {
        cartodb_id: 1314,
        zm: 1,
        canon: 1,
        uid: 1314,
        region: "Inner Rim",
        sector: null,
        grid: "O8",
        link: "http://starwars.wikia.com/wiki/Taanab",
        name_web: "Taanab",
        name_alt: null,
        name: "Taanab",
        point_y: 1652.43693312,
        point_x: 5300.39237358,
        y: 1652.44,
        x: 5300.39
      }
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [47.248021, 7.17353] },
      properties: {
        cartodb_id: 1315,
        zm: 0,
        canon: 0,
        uid: 1315,
        region: "Inner Rim",
        sector: "Hapes Cluster",
        grid: "O9",
        link: "http://starwars.wikia.com/wiki/Hapes",
        name_web: "Hapes",
        name_alt: null,
        name: "Hapes",
        point_y: 800.648232554,
        point_x: 5259.62563026,
        y: 800.65,
        x: 5259.63
      }
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [49.93943, 2.344662] },
      properties: {
        cartodb_id: 1316,
        zm: 0,
        canon: 1,
        uid: 1316,
        region: "Inner Rim",
        sector: "Japrael",
        grid: "O9",
        link: "http://starwars.wikia.com/wiki/Onderon",
        name_web: "Onderon",
        name_alt: null,
        name: "Onderon / Dxun",
        point_y: 261.079470419,
        point_x: 5559.2319352,
        y: 261.08,
        x: 5559.23
      }
    }
  ];

  doIt = name => this.props.onToolTipClick(name);

  createMarkers() {
    return this.examples.map(planet => {
      const coords = planet.geometry.coordinates.reverse();
      const marker = (
        <Marker
          key={`marker-${planet.properties.uid}`}
          position={coords}
          title={planet.properties.name}
          onClick={() => {
            this.doIt(planet.properties);
          }}>
          <Tooltip key={`tooltip-${planet.properties.uid}`}>
            {planet.properties.name}
          </Tooltip>
        </Marker>
      );
      return marker;
    });
  }

  render() {
    return (
      <Map center={[0, 10]} zoom={3} maxZoom={10} crs={CRS.Simple}>
        <LayersControl position="topright">
          {this.createMarkers()}
          <LayersControl.Overlay name="Grid" checked={false}>
            <GeoJSON
              data={grid}
              style={() => ({
                color: "#4a83ec",
                weight: 0.5
              })}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay
            name="Planets"
            checked={false}></LayersControl.Overlay>
          <LayersControl.Overlay name="Galactic sectors" checked={false}>
            <GeoJSON
              data={sector}
              style={() => ({
                color: "#4a83ec",
                weight: 0.5,
                fillColor: "black",
                fillOpacity: 0.5
              })}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Galactic regions" checked={true}>
            <GeoJSON
              data={region}
              style={() => ({
                color: "#4a83ec",
                weight: 0.5
              })}
            />
          </LayersControl.Overlay>
        </LayersControl>
      </Map>
    );
  }
}
