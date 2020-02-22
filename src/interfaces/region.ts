import { GeoJsonTypes } from "geojson";

export interface Region {
  type: GeoJsonTypes;
  geometry: { type: string; coordinates: any };
  properties: {
    cartodb_id: number;
    rid: number;
    id: number;
    name_web: string;
    link: string;
    region: string;
  };
}
