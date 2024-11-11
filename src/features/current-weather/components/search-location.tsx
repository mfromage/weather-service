import { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import SearchForm from './search-form';
import geonamesLocationService from '../services/geonames-location-service';
import { LocationService, Place } from '../types/location';
import ListItemTitleSubtitle from '@/components/list-item-title-subtitle';
import useFetchData from '@/hooks/use-fetch-data';
import { colorStyles } from '@/types/color';

type SearchLocationProps = {
  onLocationSelected: (location: Place) => void;
  locationService?: LocationService;
};

const SearchLocation = ({
  onLocationSelected,
  locationService = geonamesLocationService,
}: SearchLocationProps) => {
  const {
    data,
    error,
    loading,
    reset,
    fetchFn: findLocations,
  } = useFetchData(locationService.findLocations);

  const handleLocationPress = useCallback(
    async (location?: Place) => {
      if (!location) return;
      onLocationSelected(location);
      reset();
    },
    [onLocationSelected, reset],
  );

  const handleFormSubmit = useCallback(
    (query: string) => {
      reset();
      findLocations(query);
    },
    [reset, findLocations],
  );

  const renderLocationListItem = useCallback(
    ({ item }: { item: Place }) => (
      <ListItemTitleSubtitle
        key={item.id}
        item={item}
        title={item.name}
        subtitle={item.country}
        onPress={handleLocationPress}
        testID={`${SearchLocationTestId.listItem}-${item.id}`}
      />
    ),
    [handleLocationPress],
  );

  return (
    <View style={styles.container}>
      <SearchForm onSubmit={handleFormSubmit} disabled={loading} />
      <FlatList
        data={data}
        renderItem={renderLocationListItem}
        style={styles.locationList}
        testID={SearchLocationTestId.list}
      />
      {error && (
        <Text
          style={colorStyles.textError}
          testID={SearchLocationTestId.errorMessage}>
          {error.message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { zIndex: 10 },
  locationList: {
    position: 'absolute',
    width: '100%',
    top: 40,
    zIndex: 10,
  },
});

export default SearchLocation;

export const SearchLocationTestId = {
  list: 'search-location-list',
  listItem: 'search-location-list-item',
  errorMessage: 'search-location-error-message',
};
