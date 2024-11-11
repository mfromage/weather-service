import {useCallback} from 'react';
import SearchForm from './search-form';

const SearchLocation = () => {
  const handleSubmit = useCallback((query: string) => {
    //todo: fetch location by query
  }, []);
  return <SearchForm onSubmit={handleSubmit} />;
};

export default SearchLocation;
