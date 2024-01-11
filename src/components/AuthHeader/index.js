import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import {vh, vw} from '../../utils/units';
import {icons, images} from '../../assets';
import {colors} from '../../utils/theme';

const AuthHeader = () => {
  return <Image source={images.appLogo} style={styles.logo} />;
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    // flex: 0.35,
    // width: '60%',
    backgroundColor: 'red',
    width: vh * 10,
    height: vh * 10,
    position: 'absolute',
    top: vh * 2,
    left: vw * 2,
  },
  logo: {
    height: 70,
    width: 70,
    position: 'absolute',
    top: vh * 2,
    left: vw * 2,
    resizeMode: 'contain',
    zIndex: 100,
  },
});
