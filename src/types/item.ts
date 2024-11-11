import {PressableProps} from 'react-native';

export type ItemProps<T> = {
  item?: T;
};

export type PressableItemProps<T> = {
  onPress?: (item?: T) => void;
} & ItemProps<T> &
  Omit<PressableProps, 'onPress'>;
