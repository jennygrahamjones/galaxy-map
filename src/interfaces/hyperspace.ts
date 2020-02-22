import { GeoJsonTypes } from "geojson";

export interface Hyperspace {
  type: GeoJsonTypes;
  geometry: {
    type: string;
    coordinates: [number, number][][];
  };
  properties: {
    cartodb_id: number;
    zoom_level: number;
    hid: number;
    id: number;
    link: string;
    name_web: string;
    hyperspace: string;
    length: number;
  };
}
