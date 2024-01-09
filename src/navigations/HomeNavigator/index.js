import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MenuScreen from '../../screens/HomeScreens/MenuScreen';
import {NavigationContainer} from '@react-navigation/native';
import CustomDrawer from '../../components/CustomDrawer';
import PrinterScreen from '../../screens/HomeScreens/PrinterScreen';
import NavigationOptions from '../navigationOptions';
import {useDispatch} from 'react-redux';
import {onMenuChange} from '../../store/slices/generalSlice';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddNewPrinter from '../../screens/HomeScreens/AddNewPrinter';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const PrinterStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="PrinterScreen">
      <Stack.Screen name="PrinterScreen" component={PrinterScreen} />
      <Stack.Screen name="AddNewPrinter" component={AddNewPrinter} />
    </Stack.Navigator>
  );
};

const HomeNavigator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onMenuChange('Sell'));
  }, []);

  return (
    <Drawer.Navigator
      screenOptions={NavigationOptions}
      initialRouteName="Home"
      drawerContent={CustomDrawer}>
      <Drawer.Screen name="MenuScreen" component={MenuScreen} />
      <Drawer.Screen name="PrinterStack" component={PrinterStack} />
    </Drawer.Navigator>
  );
};

export default HomeNavigator;
