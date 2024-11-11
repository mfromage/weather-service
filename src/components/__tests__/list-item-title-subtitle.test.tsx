import ListItemTitleSubtitle from '@/components/list-item-title-subtitle';
import {fireEvent, render} from '@testing-library/react-native';

describe('ListItemTitleSubtitle', () => {
  const setup = (props = {}) => {
    const testId = 'list-item-title-subtitle-test-id';
    const defaultProps = {
      title: 'Hello',
      subtitle: 'world',
      item: {id: testId},
      onPress: jest.fn(),
    };
    const utils = render(
      <ListItemTitleSubtitle {...defaultProps} {...props} testID={testId} />,
    );
    const listItemTitleSubtitle = utils.getByTestId(testId);
    return {...utils, listItemTitleSubtitle};
  };

  it('render with given props', () => {
    const title = 'This is title';
    const subtitle = 'not a title';

    const {getByText} = setup({title, subtitle});
    expect(getByText(title)).toBeTruthy();
    expect(getByText(subtitle)).toBeTruthy();
  });

  it('matches the snapshot', () => {
    const {toJSON} = setup();
    expect(toJSON()).toMatchSnapshot();
  });

  it('call onPress with given item', () => {
    const onPress = jest.fn();
    const item = {id: 1, name: 'hello'};
    const {listItemTitleSubtitle} = setup({item, onPress});

    fireEvent.press(listItemTitleSubtitle);
    expect(onPress).toHaveBeenCalledWith(item);
  });
});
