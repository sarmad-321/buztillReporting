import {ActivityIndicator, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import useMenuController from './useMenuController';
import {styles} from './styles';
import {REACT_APP_WEBVIEW_URL, REACT_APP_API_ENDPOINT_PROD} from '@env';

const MenuScreen = () => {
  const {webViewLoading, webViewRef, user, handleDataFromWweb} =
    useMenuController();

  const domainUrl = __DEV__
    ? REACT_APP_WEBVIEW_URL
    : REACT_APP_API_ENDPOINT_PROD;

  return (
    <View style={{height: '100%'}}>
      {webViewLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size={'large'} />
        </View>
      )}
      <WebView
        ref={webViewRef}
        source={{
          uri: `https://${user.store?.storeName}.${domainUrl}?ismobapp=2`,
          // uri: `http://192.168.0.117:3000?ismobapp=1`,
        }}
        onMessage={event => {
          console.log(
            'Received data from React.js:',
            JSON.parse(event.nativeEvent.data),
          );
          const data = JSON.parse(event.nativeEvent.data);
          handleDataFromWweb(data);
        }}
        style={{flex: webViewLoading ? 0 : 1}}
      />
    </View>
  );
};

export default MenuScreen;
