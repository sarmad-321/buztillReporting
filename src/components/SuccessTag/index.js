import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {vh, vw} from '../../utils/units';
import {icons} from '../../assets';
import InterMedium from '../TextWrapper/InterMedium';
import {colors} from '../../utils/theme';

const SuccessTag = ({text}) => {
  return (
    <View style={styles.container}>
      <Image source={icons.tick} style={styles.error} />
      <InterMedium style={styles.font}>{text}</InterMedium>
    </View>
  );
};

export default SuccessTag;

const styles = StyleSheet.create({
  container: {
    height: vh * 5,
    backgroundColor: '#5cb85c',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
    borderRadius: 4,
    top: '-5%',
    paddingHorizontal: '5%',
  },
  error: {
    height: vh * 2,
    width: vh * 2,
    resizeMode: 'contain',
    marginRight: vw * 2,
  },
  font: {
    fontSize: vh * 1.8,
    color: 'white',
    fontWeight: 'bold',
  },
});
