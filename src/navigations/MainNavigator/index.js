import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from '../AuthNavigator';
import HomeNavigator from '../HomeNavigator';
import SplashScreen from '../../screens/AuthScreens/SplashScreen';
import {useSelector} from 'react-redux';

const MainStack = createNativeStackNavigator();

const MainNavigator = () => {
  const state = useSelector(state => state.user);

  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="SplashScreen">
        <MainStack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="AuthNavigator"
          component={AuthNavigator}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="HomeNavigator"
          component={HomeNavigator}
          options={{headerShown: false}}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
