import 'intl-pluralrules';
import {StyleSheet, StatusBar, View, useColorScheme} from 'react-native';
import React, {useState, useEffect} from 'react';
import MainNavigator from './src/navigations/MainNavigator';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {store} from './src/store';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/utils/helperFunctions';
import {initReactI18next} from 'react-i18next';
import i18n from 'i18next';
import en from './src/translations/en.json';
import mt from './src/translations/maltese.json';

const App = () => {
  const theme = useColorScheme();

  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: {
        en: {translation: en},
        mt: {translation: mt},
        // Add more languages as needed
      },
      lng: 'en', // set the default language
      fallbackLng: 'en', // use English if the translation for the current language is not available
      interpolation: {
        escapeValue: false, // react already safely escapes interpolated values
      },
    });

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          barStyle={theme == 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
        />
        <MainNavigator />
        <Toast config={toastConfig} />
      </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
