import { GeoJSON, Map, Marker, Popup } from "react-leaflet";
import React from "react";
import region from "../../data/region.json";
import { CRS } from "leaflet";

export class BaseMap extends React.Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13
  };

  example = {
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
  };

  render() {
    return (
      <Map center={[0, 10]} zoom={3} maxZoom={10} crs={CRS.Simple}>
        <GeoJSON
          data={this.example}
          style={() => ({
            color: "#4a83ec",
            weight: 0.5,
            fillColor: "black",
            fillOpacity: 1
          })}
        />
        <GeoJSON
          data={region}
          style={() => ({
            color: "#4a83ec",
            weight: 0.5,
            fillColor: "black",
            fillOpacity: 1
          })}
        />
      </Map>
    );
  }
}
