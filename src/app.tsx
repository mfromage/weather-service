import {Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import CurrentWeather from './features/current-weather/components/current-weather';
import owWeatherService from './features/current-weather/services/ow-weather-service';
import meteoSourceWeatherService from './features/current-weather/services/meteosource-weather-service';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <CurrentWeather
        weatherServices={[owWeatherService, meteoSourceWeatherService]}
      />
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
