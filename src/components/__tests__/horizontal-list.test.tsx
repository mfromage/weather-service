import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import HorizontalList from '@/components/horizontal-list';

describe('Horizontal List', () => {
  const setup = () => {
    const testId = 'horizontal-list-test-id';
    const utils = render(
      <HorizontalList testID={testId}>
        <Text>Text 1</Text>
        <Text>Text 2</Text>
      </HorizontalList>,
    );
    const horizontalList = utils.getByTestId(testId);
    return { ...utils, horizontalList };
  };
  it('render with given props', () => {
    const { horizontalList } = setup();
    expect(horizontalList).toBeTruthy();
  });

  it('matches the snapshot', () => {
    const { toJSON } = setup();
    expect(toJSON()).toMatchSnapshot();
  });

  it('contains the children', () => {
    const { horizontalList } = setup();
    expect(horizontalList.children.length).toBe(2);
  });
});
