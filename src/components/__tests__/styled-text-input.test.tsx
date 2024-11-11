import { fireEvent, render } from '@testing-library/react-native';
import StyledTextInput from '@/components/styled-text-input';

describe('StyledTextInput', () => {
  const setup = (props = {}) => {
    const testId = 'styled-text-input-test-id';
    const defaultProps = {
      placeholder: 'type something here...',
      onChangeText: jest.fn(),
    };
    const utils = render(
      <StyledTextInput {...defaultProps} {...props} testID={testId} />,
    );
    const styledTextInput = utils.getByTestId(testId);
    return { ...utils, styledTextInput };
  };
  it('render with given props', () => {
    const placeholder = 'type nothing here...';
    const { getByPlaceholderText } = setup({ placeholder });
    expect(getByPlaceholderText(placeholder)).toBeTruthy();
  });

  it('matches the snapshot', () => {
    const { toJSON } = setup();
    expect(toJSON()).toMatchSnapshot();
  });

  it('call onChangeText', () => {
    const onChangeText = jest.fn();
    const { styledTextInput } = setup({ onChangeText });

    fireEvent.changeText(styledTextInput, 'hello');
    expect(onChangeText).toHaveBeenCalledWith('hello');
  });
});
