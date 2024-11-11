import Button from '@/components/button';
import {fireEvent, render} from '@testing-library/react-native';

describe('Button', () => {
  const setup = (props = {}) => {
    const testId = 'button-test-id';
    const defaultProps = {title: 'Hello world', onPress: jest.fn()};
    const utils = render(
      <Button {...defaultProps} {...props} testID={testId} />,
    );
    const button = utils.getByTestId(testId);
    return {...utils, button};
  };
  it('render with given props', () => {
    const title = 'button 1';
    const {getByText} = setup({title});
    expect(getByText(title)).toBeTruthy();
  });

  it('matches the snapshot', () => {
    const {toJSON} = setup();
    expect(toJSON()).toMatchSnapshot();
  });

  it('call onPress', () => {
    const onPress = jest.fn();
    const {button} = setup({onPress});

    fireEvent.press(button);
    expect(onPress).toHaveBeenCalled();
  });
});
