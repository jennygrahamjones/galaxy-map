export interface GridSquare {
  type: string;
  geometry: { type: string; coordinates: any };
  properties: {
    grid: string;
    cartodb_id: number;
    created_at: string;
    updated_at: string;
  };
}
