import {
  DeviceEventEmitter,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {styles} from './styles';
import AuthHeader from '../../../components/AuthHeader';
import StoreForm from './StoreForm';
import LoginForm from './LoginForm';
import Animated from 'react-native-reanimated';
import {LightSpeedInRight, LightSpeedOutLeft} from 'react-native-reanimated';
import Swiper from 'react-native-swiper';
import {icons} from '../../../assets';
import ArialBold from '../../../components/TextWrapper/ArialBold';
import {vw} from '../../../utils/units';
import Slide1 from './Slide1';
import {colors} from '../../../utils/theme';
import useLoginController from './useLoginController';
import ForgotPassForm from './ForgotPassForm';

const LoginScreen = () => {
  const {
    currentForm,
    setCurrentForm,
    onNextPress,
    store,
    error,
    notYourStorePress,
    onLoginPress,
    setSuccessMsg,
    onForgetEmail,
    successMsg,
  } = useLoginController();
  const [width, setWidth] = useState(Dimensions.get('window').width);

  const handleOrientationChange = () => {
    const {width, height} = Dimensions.get('window');
    console.log(width, 'width');
    setWidth(width);
  };

  useEffect(() => {
    // Add dimension change listener
    Dimensions.addEventListener('change', handleOrientationChange);

    // Remove the listener when the component unmounts
  }, []);
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <AuthHeader />

        <View style={styles.formContainer}>
          {/* {currentForm == 'Login' && (
            <Animated.View
              entering={LightSpeedInRight.delay(1000).duration(900)}
              style={styles.storeBtnContainer}>
              <TouchableOpacity
                onPress={() => notYourStorePress()}
                style={styles.storeBtn}>
                <Image style={styles.storeIcon} source={icons.store} />
                <ArialBold style={{color: 'white', fontSize: 16}}>
                  {store?.storeName}
                </ArialBold>
              </TouchableOpacity>
              <Text style={{color: colors.primary}}>Not Your Store ?</Text>
            </Animated.View>
          )} */}
          {currentForm == 'Store' && (
            <Animated.View
              entering={LightSpeedInRight.duration(900)}
              exiting={LightSpeedOutLeft.duration(700)}>
              <StoreForm
                error={error}
                width={width}
                onNextPress={onNextPress}
                setCurrentForm={setCurrentForm}
              />
            </Animated.View>
          )}
          {currentForm == 'Login' && (
            <Animated.View
              entering={LightSpeedInRight.delay(500).duration(900)}>
              <LoginForm
                width={width}
                error={error}
                currentForm={currentForm}
                setCurrentForm={setCurrentForm}
                onLoginPress={onLoginPress}
                store={store}
              />
            </Animated.View>
          )}

          {currentForm == 'ForgetPass' && (
            <Animated.View
              entering={LightSpeedInRight.delay(500).duration(900)}>
              <ForgotPassForm
                error={error}
                successMsg={successMsg}
                setSuccessMsg={setSuccessMsg}
                setCurrentForm={setCurrentForm}
                onForgetPress={onForgetEmail}
              />
            </Animated.View>
          )}
        </View>
        {width > 800 && (
          <View style={styles.swiperContainer}>
            <Swiper
              paginationStyle={{marginRight: '80%'}}
              dotStyle={styles.dotStyle}
              activeDotColor="white">
              <Slide1 />
              <Slide1 />
            </Swiper>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default LoginScreen;
