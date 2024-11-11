import { fireEvent, render } from '@testing-library/react-native';
import SearchForm, { SearchFormTestId } from '../search-form';

describe('SearchForm', () => {
  const setup = (props = {}) =>
    render(<SearchForm onSubmit={jest.fn} {...props} />);

  it('renders correctly with given props', () => {
    const { getByText, getByPlaceholderText } = setup();
    expect(getByPlaceholderText('type a place...')).toBeTruthy();
    expect(getByText('Search')).toBeTruthy();
  });

  it('shows required error message when submit with empty query', () => {
    const { getByTestId } = setup();

    fireEvent.press(getByTestId(SearchFormTestId.submitButton));

    const errorMessage = getByTestId(SearchFormTestId.errorMessage);
    expect(errorMessage.props.children).toBe('Please type any city...');
  });

  it('shows minimum error message when submit with less than 3 characters', () => {
    const { getByTestId } = setup();

    fireEvent.changeText(getByTestId(SearchFormTestId.input), 'fr');
    fireEvent.press(getByTestId(SearchFormTestId.submitButton));

    const errorMessage = getByTestId(SearchFormTestId.errorMessage);
    expect(errorMessage.props.children).toBe('Minimum 3 characters...');
  });

  it('call onSubmit when submit minimum 3 characters', () => {
    const onSubmit = jest.fn();
    const { getByTestId } = setup({ onSubmit });

    fireEvent.changeText(getByTestId(SearchFormTestId.input), 'frankfurt');
    fireEvent.press(getByTestId(SearchFormTestId.submitButton));

    expect(onSubmit).toHaveBeenCalledWith('frankfurt');
  });
});
