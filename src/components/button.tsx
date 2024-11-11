import { memo } from 'react';
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';
import { Colors } from '@/types/color';

type ButtonProps = {
  title: string;
} & PressableProps;

const Button = ({ title, disabled, ...rest }: ButtonProps) => (
  <Pressable
    style={[styles.button, disabled && styles.disabled]}
    disabled={disabled}
    {...rest}>
    <Text style={styles.label}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    height: 40,
    backgroundColor: Colors.primary,
  },
  label: {
    color: Colors.white,
  },
  disabled: {
    backgroundColor: Colors.lightgray,
  },
});

export default memo(Button);
