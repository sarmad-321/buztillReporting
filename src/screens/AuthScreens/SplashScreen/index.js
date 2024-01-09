import {Easing, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../../../utils/theme';
import {images} from '../../../assets';
import {vh} from '../../../utils/units';
import {useSelector} from 'react-redux';

const SplashScreen = ({navigation}) => {
  const offset = useSharedValue(1);
  const token = useSelector(state => state.user.token);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{scale: offset.value}],
  }));

  // React.useEffect(() => {
  //   let validatingTimeout;
  //   offset.value = withRepeat(withTiming(0.5, {duration: 2000}), -1, true);
  //   console.log(validatingTimeout, 'timeout');
  //   if (validatingTimeout) {
  //     clearTimeout(validatingTimeout);
  //   }
  //   validatingTimeout = setTimeout(() => {
  //     if (token) {
  //       navigation.replace('HomeNavigator');
  //     } else {
  //       handleNavigation('AuthNavigator');
  //     }
  //   }, 2000);
  // }, [token]);

  React.useEffect(() => {
    let validatingTimeout;

    const checkTokenAndNavigate = async () => {
      offset.value = withRepeat(withTiming(0.5, {duration: 2000}), -1, true);
      console.log(validatingTimeout, 'timeout');

      if (validatingTimeout) {
        clearTimeout(validatingTimeout);
      }

      validatingTimeout = setTimeout(() => {
        if (token) {
          navigation.replace('HomeNavigator');
        } else {
          handleNavigation('AuthNavigator');
        }
      }, 2000);
    };

    checkTokenAndNavigate();

    // Cleanup function to clear the timeout if the component unmounts or if token changes
    return () => {
      if (validatingTimeout) {
        clearTimeout(validatingTimeout);
      }
    };
  }, [token]);

  const handleNavigation = () => {
    navigation.replace('AuthNavigator');
  };

  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <ImageBackground
        source={images.splash}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animated.Image
          source={images.appLogo}
          style={[styles.logo, animatedStyles]}
        />
      </ImageBackground>
    </Animated.View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  logo: {
    width: vh * 20,
    height: vh * 20,
    resizeMode: 'contain',
  },
});
