import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/theme';

const Divider = () => {
  return <View style={styles.container}></View>;
};

export default Divider;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff2b',
    height: 1,
    width: '80%',
    marginVertical: '2%',
    alignSelf: 'center',
  },
});
