export interface Sector {
  type: string;
  geometry: { type: string; coordinates: any };
  properties: {
    sector: string;
    sid: number;
    name_web: string;
    link: string;
    cartodb_id: number;
    created_at: string;
    updated_at: string;
  };
}
