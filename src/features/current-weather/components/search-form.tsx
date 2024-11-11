import {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colorStyles} from '@/types/color';
import Button from '@/components/button';
import StyledTextInput from '@/components/styled-text-input';

type SearchFormProps = {
  onSubmit: (query: string) => void;
  disabled?: boolean;
};

const SearchForm = ({disabled, onSubmit}: SearchFormProps) => {
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();

  const onQueryChange = useCallback((text: string) => {
    setQuery(text);
  }, []);

  const handleSubmitPress = useCallback(() => {
    if (query.length === 0) {
      setErrorMessage('Please type any city...');
      return;
    } else if (query.length < 3) {
      setErrorMessage('Minimum 3 characters...');
      return;
    }

    setErrorMessage(undefined);
    onSubmit(query);
  }, [query, onSubmit]);

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <StyledTextInput
          placeholder="type a place..."
          onChangeText={onQueryChange}
          testID={SearchFormTestId.input}
          value={query}
        />
        {errorMessage && (
          <Text
            style={colorStyles.textError}
            testID={SearchFormTestId.errorMessage}>
            {errorMessage}
          </Text>
        )}
      </View>
      <Button
        title="Search"
        onPress={handleSubmitPress}
        disabled={disabled}
        testID={SearchFormTestId.submitButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
  },
});

export const SearchFormTestId = {
  input: 'search-form-input',
  submitButton: 'search-form-submit-button',
  errorMessage: 'search-form-error-message',
};
export default SearchForm;
