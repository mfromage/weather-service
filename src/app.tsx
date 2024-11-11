import { lazy, Suspense } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Splash from './features/current-weather/components/splash';
import meteoSourceWeatherService from './features/current-weather/services/meteosource-weather-service';
import owWeatherService from './features/current-weather/services/ow-weather-service';

const CurrentWeather = lazy(
  () => import('@/features/current-weather/components/current-weather'),
);
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Suspense fallback={<Splash />}>
        <CurrentWeather
          weatherServices={[owWeatherService, meteoSourceWeatherService]}
        />
      </Suspense>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
});

export default App;
