import Chip from '@/components/chip';
import {fireEvent, render} from '@testing-library/react-native';

describe('Chip', () => {
  const setup = (props = {}) => {
    const testId = 'chip-test-id';
    const defaultProps = {
      title: 'Hello world',
      item: {id: testId},
      onPress: jest.fn(),
    };
    const utils = render(<Chip {...defaultProps} {...props} testID={testId} />);
    const chip = utils.getByTestId(testId);
    return {...utils, chip};
  };
  it('render with given props', () => {
    const title = 'Hello world';
    const {getByText} = setup({title});

    expect(getByText(title)).toBeTruthy();
  });

  it('matches the snapshot', () => {
    const {toJSON} = setup();
    expect(toJSON()).toMatchSnapshot();
  });

  it('call onPress with given item', () => {
    const item = {id: 1, name: 'hello'};
    const onPress = jest.fn();
    const {chip} = setup({item, onPress});

    fireEvent.press(chip);
    expect(onPress).toHaveBeenCalledWith(item);
  });

  it('not call onPress if selected', () => {
    const onPress = jest.fn();
    const {chip} = setup();

    fireEvent.press(chip);
    expect(onPress).not.toHaveBeenCalled();
  });
});
