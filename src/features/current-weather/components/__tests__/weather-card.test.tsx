import { render } from '@testing-library/react-native';
import React from 'react';
import WeatherCard from '../weather-card';

describe('WeatherCard', () => {
  const setup = () =>
    render(<WeatherCard name="Frankfurt am Main" temp={5.15} summary="Mist" />);

  it('renders correctly with given props', () => {
    const { getByText } = setup();

    expect(getByText('Frankfurt am Main')).toBeTruthy();
    expect(getByText('5.15º')).toBeTruthy();
    expect(getByText('Mist')).toBeTruthy();
  });
  it('matches the snapshot', () => {
    const { toJSON } = setup();
    expect(toJSON()).toMatchSnapshot();
  });
});
