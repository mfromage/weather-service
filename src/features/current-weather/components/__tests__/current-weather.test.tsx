import { render } from '@testing-library/react-native';
import { WeatherService } from '../../types/weather';
import CurrentWeather, { CurrentWeatherTestId } from '../current-weather';

const mockGetCurrentWeather = jest
  .fn()
  .mockResolvedValue({ temp: 8.3, summary: 'clouds' });
const mockWeatherService: WeatherService = {
  id: 'mock-success',
  name: 'Weather Service 1',
  getCurrentWeather: mockGetCurrentWeather,
};
const mockErrorWeatherService: WeatherService = {
  id: 'mock-error',
  name: 'Weather Service 2',
  getCurrentWeather: mockGetCurrentWeather,
};

describe('CurrentWeather', () => {
  it('shows weather service options', async () => {
    const weatherServices: [WeatherService, ...WeatherService[]] = [
      mockWeatherService,
      mockErrorWeatherService,
    ];
    const { getByTestId } = render(
      <CurrentWeather weatherServices={weatherServices} />,
    );

    expect(getByTestId(CurrentWeatherTestId.services).children.length).toBe(
      weatherServices.length,
    );
  });
});
