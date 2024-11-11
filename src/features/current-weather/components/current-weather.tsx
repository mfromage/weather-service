import {useCallback} from 'react';
import SearchLocation from './search-location';
import {Place} from '../types/location';

const CurrentWeather = () => {
  const onLocationSelected = useCallback((location: Place) => {
    //todo: fetch current weather with location
  }, []);
  return <SearchLocation onLocationSelected={onLocationSelected} />;
};

export default CurrentWeather;
