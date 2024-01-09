import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import {vh, vw} from '../../utils/units';
import {icons, images} from '../../assets';
import {colors} from '../../utils/theme';

const AuthHeader = () => {
  const containerSize = vh * 10; // Adjust as needed

  return (
    <View
      style={[styles.container, {width: containerSize, height: containerSize}]}>
      <Image source={images.appLogo} style={styles.logo} />
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    // flex: 0.35,
    // width: '60%',
    position: 'absolute',
    top: vh * 2,
    left: vw * 2,
  },
  logo: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});
