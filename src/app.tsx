import {Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import CurrentWeather from './features/current-weather/components/current-weather';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <CurrentWeather />
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
