export type Coordinate = {
  lat: number;
  lon: number;
};

export type Place = {
  id: number;
  name: string;
  country: string;
  coordinate: Coordinate;
};

export interface LocationService {
  findLocations(query: string): Promise<Place[]>;
}
