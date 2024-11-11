import {act, fireEvent, render, waitFor} from '@testing-library/react-native';
import SearchLocation, {SearchLocationTestId} from '../search-location';
import {SearchFormTestId} from '../search-form';
import geonamesLocationService from '../../services/geonames-location-service';
import {LocationService, Place} from '../../types/location';

const mockItem: Place = {
  id: 1,
  name: 'Frankfurt',
  country: 'Germany',
  coordinate: {
    lat: 50.11092,
    lon: 8.682127,
  },
};
const query = mockItem.name;
const mockFindLocations = jest
  .fn()
  .mockResolvedValue([
    mockItem,
    {id: 2, name: 'London', country: 'United Kingdom'},
  ]);

const mockLocationService: LocationService = {
  findLocations: mockFindLocations,
};

describe('SearchLocation', () => {
  const setup = (props = {}) =>
    render(
      <SearchLocation
        onLocationSelected={jest.fn()}
        locationService={mockLocationService}
        {...props}
      />,
    );
  it('shows location list', async () => {
    const {getByTestId} = setup();

    fireEvent.changeText(getByTestId(SearchFormTestId.input), query);
    await act(async () => {
      fireEvent.press(getByTestId(SearchFormTestId.submitButton));
    });

    expect(mockFindLocations).toHaveBeenCalledWith(query);

    const locationList = getByTestId(SearchLocationTestId.list);
    expect(locationList.props.data.length).toBeGreaterThan(1);
  });

  it('calls onLocationSelected when a location is selected', async () => {
    const onLocationSelected = jest.fn();
    const {getByTestId} = setup({onLocationSelected});

    fireEvent.changeText(getByTestId(SearchFormTestId.input), query);
    await act(async () => {
      fireEvent.press(getByTestId(SearchFormTestId.submitButton));
    });

    expect(mockFindLocations).toHaveBeenCalledWith(query);

    const locationListItem = getByTestId(
      `${SearchLocationTestId.listItem}-${mockItem.id}`,
    );
    fireEvent.press(locationListItem);
    expect(onLocationSelected).toHaveBeenCalledWith(mockItem);
  });

  it('shows error message when error is thrown', async () => {
    const errorMessage = 'some error found';
    const findLocations = jest.fn().mockRejectedValue(new Error(errorMessage));
    const {getByTestId, getByText} = setup({
      locationService: {findLocations},
    });

    fireEvent.changeText(getByTestId(SearchFormTestId.input), query);
    await act(async () => {
      fireEvent.press(getByTestId(SearchFormTestId.submitButton));
    });

    expect(mockFindLocations).toHaveBeenCalledWith(query);

    expect(getByText(errorMessage)).toBeTruthy();
  });
});
