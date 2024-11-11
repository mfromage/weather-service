import { Coordinate } from './location';

export type Weather = {
  temp: number;
  summary: string;
};

export interface WeatherService {
  id: string;
  name: string;
  getCurrentWeather(coordinate: Coordinate): Promise<Weather>;
}
