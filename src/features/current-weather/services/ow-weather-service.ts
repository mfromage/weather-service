import {OPEN_WEATHER_API_URL, OPEN_WEATHER_API_KEY} from '@env';
import {fetchData} from '@/utils/fetch-data';
import {Coordinate} from '../types/location';
import {Weather, WeatherService} from '../types/weather';

type OWWeather = {
  main: string;
};

type OWWeatherInfo = {
  temp: number;
};

type OWCurrentWeatherResponse = {
  weather: OWWeather[];
  main: OWWeatherInfo;
};

const owWeatherService: WeatherService = {
  id: 'openweather',
  name: 'OpenWeather',

  async getCurrentWeather(coordinate: Coordinate): Promise<Weather> {
    const url = `${OPEN_WEATHER_API_URL}/weather`;
    const params = {
      lat: `${coordinate.lat}`,
      lon: `${coordinate.lon}`,
      units: 'metric',
      appid: OPEN_WEATHER_API_KEY,
    };
    const response = await fetchData<OWCurrentWeatherResponse>(url, params);
    return {
      temp: response.main.temp,
      summary: response.weather.length > 0 ? response.weather[0].main : '',
    };
  },
};

export default owWeatherService;
