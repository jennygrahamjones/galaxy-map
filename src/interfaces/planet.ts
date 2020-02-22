import { GeoJsonTypes } from "geojson";

export interface PlanetProperties {
  cartodb_id: number;
  zm: number;
  canon: number;
  uid: number;
  region: string;
  sector: string;
  grid: string;
  link: string;
  name_web: string;
  name_alt: string;
  name: string;
  point_y: number;
  point_x: number;
  y: number;
  x: number;
  icon?: string;
}

interface PlanetGeometry {
  type: GeoJsonTypes;
  coordinates: number[];
}

export interface Planet {
  type: GeoJsonTypes;
  geometry: PlanetGeometry;
  properties: PlanetProperties;
}
