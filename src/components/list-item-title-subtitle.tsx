import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/types/color';
import { PressableItemProps } from '@/types/item';

type ListItemTitleSubtitleProps<T> = {
  title: string;
  subtitle?: string;
} & PressableItemProps<T>;
const ListItemTitleSubtitle = <T,>({
  title,
  subtitle,
  item,
  onPress,
  ...rest
}: ListItemTitleSubtitleProps<T>) => {
  const handlePress = () => onPress && onPress(item);
  return (
    <Pressable onPress={handlePress} {...rest}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: Colors.lightgray,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
  },
});

export default memo(ListItemTitleSubtitle) as typeof ListItemTitleSubtitle;
