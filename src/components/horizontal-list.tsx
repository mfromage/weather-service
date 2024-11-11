import React, {memo} from 'react';
import {ScrollView, ScrollViewProps, StyleSheet, View} from 'react-native';

const HorizontalList = ({children, testID, ...rest}: ScrollViewProps) => (
  <ScrollView horizontal {...rest}>
    <View style={styles.wrapper} testID={testID}>
      {children}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
    flexDirection: 'row',
  },
});

export default memo(HorizontalList);
