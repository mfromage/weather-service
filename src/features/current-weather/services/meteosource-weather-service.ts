import { METEOSOURCE_API_URL, METEOSOURCE_API_KEY } from '@env';
import { Coordinate } from '../types/location';
import { Weather, WeatherService } from '../types/weather';
import { fetchData } from '@/utils/fetch-data';

type MeteoSourceWeather = {
  temperature: number;
  summary: string;
};

type MeteoSourceCurrentWeatherResponse = {
  current: MeteoSourceWeather;
};

const meteoSourceWeatherService: WeatherService = {
  id: 'meteosource',
  name: 'MeteoSource',

  async getCurrentWeather(coordinate: Coordinate): Promise<Weather> {
    const url = `${METEOSOURCE_API_URL}/point`;
    const params = {
      lat: `${coordinate.lat}`,
      lon: `${coordinate.lon}`,
      units: 'metric',
      language: 'en',
      key: METEOSOURCE_API_KEY,
    };
    const response = await fetchData<MeteoSourceCurrentWeatherResponse>(
      url,
      params,
    );
    return {
      temp: response.current.temperature,
      summary: response.current.summary,
    };
  },
};

export default meteoSourceWeatherService;
