import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/types/color';

type WeatherCardProps = {
  name: string;
  temp: number;
  summary: string;
  testID?: string;
};
const WeatherCard = ({ name, temp, summary, testID }: WeatherCardProps) => (
  <View style={styles.container} testID={testID}>
    <View style={styles.cityTemperature}>
      <Text style={styles.city}>{name}</Text>
      <Text style={styles.temperature}>{temp}º</Text>
    </View>
    <Text>{summary}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    borderRadius: 16,
    backgroundColor: Colors.lightgray,
  },
  cityTemperature: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  city: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 24,
  },
});

export default memo(WeatherCard);
