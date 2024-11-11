import { GEONAMES_API_URL, GEONAMES_API_KEY } from '@env';
import { LocationService, Place } from '../types/location';
import { fetchData } from '@/utils/fetch-data';

type Geoname = {
  geonameId: number;
  name: string;
  countryName: string;
  lat: number;
  lng: number;
};

type GeonamesSearchResponse = {
  geonames: Geoname[];
};

const geonamesLocationService: LocationService = {
  async findLocations(query: string): Promise<Place[]> {
    const url = `${GEONAMES_API_URL}/searchJSON`;
    const param = {
      q: query,
      maxRows: '5',
      username: GEONAMES_API_KEY,
    };
    const response = await fetchData<GeonamesSearchResponse>(url, param);
    if (!response.geonames || response.geonames.length === 0) {
      throw new Error('No location found');
    }

    return response.geonames.map(
      ({ geonameId: id, name, countryName, lat, lng: lon }) => ({
        id,
        name,
        country: countryName,
        coordinate: { lat, lon },
      }),
    );
  },
};

export default geonamesLocationService;
