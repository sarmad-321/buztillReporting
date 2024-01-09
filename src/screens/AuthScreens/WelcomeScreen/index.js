import {View, Text} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {styles} from './styles';
import InputField from '../../../components/InputField';
import MainButton from '../../../components/MainButton';
import AuthHeader from '../../../components/AuthHeader';

const WelcomeScreen = ({navigation}) => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <AuthHeader />
          <InputField placeholder="Enter Email Address" />
          <InputField placeholder="Enter Password" />
          <MainButton onPress={() => navigation.navigate('HomeNavigator')} />
        </View>
        <View style={styles.swiperContainer}></View>
      </View>
    </ScreenWrapper>
  );
};

export default WelcomeScreen;
