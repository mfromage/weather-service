import {memo} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {Colors} from '@/types/color';

const StyledTextInput = ({style, ...rest}: TextInputProps) => (
  <TextInput style={[styles.input, style]} {...rest} autoCorrect={false} />
);

const styles = StyleSheet.create({
  input: {
    borderColor: Colors.lightgray,
    borderWidth: 0.5,
    padding: 12,
    borderRadius: 12,
    height: 40,
  },
});
export default memo(StyledTextInput);
