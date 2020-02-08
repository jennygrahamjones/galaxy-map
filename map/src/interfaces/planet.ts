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
}

interface PlanetGeometry {
  type: string;
  coordinates: number[];
}

export interface Planet {
  type: string;
  geometry: PlanetGeometry;
  properties: PlanetProperties;
}

export interface Planet {}
