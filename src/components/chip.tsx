import {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors} from '@/types/color';
import {PressableItemProps} from '@/types/item';

type ChipProps<T> = {
  title: string;
  selected?: boolean;
} & PressableItemProps<T>;

const Chip = <T,>({
  title,
  item,
  onPress,
  selected = false,
  ...rest
}: ChipProps<T>) => {
  const handlePress = () => !selected && onPress && onPress(item);

  return (
    <Pressable onPress={handlePress} {...rest}>
      <View style={[styles.container, selected && styles.containerSelected]}>
        <Text style={[styles.label, selected && styles.labelSelected]}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  containerSelected: {
    backgroundColor: Colors.primary,
  },
  label: {
    fontSize: 12,
    color: Colors.primary,
  },
  labelSelected: {
    color: Colors.white,
  },
});

export default memo(Chip) as typeof Chip;
