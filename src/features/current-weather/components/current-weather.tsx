import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SearchLocation from './search-location';
import WeatherCard from './weather-card';
import { Place } from '../types/location';
import { WeatherService } from '../types/weather';
import Chip from '@/components/chip';
import HorizontalList from '@/components/horizontal-list';
import useFetchData from '@/hooks/use-fetch-data';
import { colorStyles } from '@/types/color';

type CurrentWeatherProps = {
  weatherServices: [WeatherService, ...WeatherService[]];
};

const CurrentWeather = ({ weatherServices }: CurrentWeatherProps) => {
  const [selectedWeatherService, setSelectedWeatherService] = useState(
    weatherServices[0],
  );
  const [selectedLocation, setSelectedLocation] = useState<Place>();
  const {
    data: currentWeather,
    error,
    loading,
    fetchFn: getCurrentWeather,
  } = useFetchData(selectedWeatherService.getCurrentWeather);

  const shouldShowCurrentWeather = selectedLocation && currentWeather;

  const handleServiceShipPress = useCallback(
    (service?: WeatherService) => {
      if (!service) return;
      setSelectedWeatherService(service);
    },
    [setSelectedWeatherService],
  );

  const renderServiceChip = useCallback(
    (service: WeatherService) => (
      <Chip
        key={service.id}
        title={service.name}
        item={service}
        selected={selectedWeatherService.id === service.id}
        onPress={handleServiceShipPress}
        testID={`${CurrentWeatherTestId.serviceItem}-${service.id}`}
      />
    ),
    [selectedWeatherService],
  );

  useEffect(() => {
    if (selectedLocation === undefined) return;
    getCurrentWeather(selectedLocation.coordinate);
  }, [selectedLocation, selectedWeatherService]);

  return (
    <View style={styles.container}>
      <HorizontalList
        style={styles.chipsContainer}
        testID={CurrentWeatherTestId.services}>
        {weatherServices.map(renderServiceChip)}
      </HorizontalList>
      <SearchLocation onLocationSelected={setSelectedLocation} />
      {loading && <Text>Loading...</Text>}
      {error && (
        <Text
          style={colorStyles.textError}
          testID={CurrentWeatherTestId.errorMessage}>
          {error.message}
        </Text>
      )}
      {!loading && shouldShowCurrentWeather && (
        <WeatherCard
          name={selectedLocation.name}
          temp={currentWeather.temp}
          summary={currentWeather.summary}
          testID={CurrentWeatherTestId.weatherCard}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  chipsContainer: {
    height: 30,
  },
});

export const CurrentWeatherTestId = {
  services: 'current-weather-services',
  serviceItem: 'current-weather-service-item',
  weatherCard: 'current-weather-card',
  errorMessage: 'current-weather-error-message',
};
export default CurrentWeather;
