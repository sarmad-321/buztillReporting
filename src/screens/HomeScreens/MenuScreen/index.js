import {ActivityIndicator, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import useMenuController from './useMenuController';
import {styles} from './styles';

const MenuScreen = () => {
  const {webViewLoading, webViewRef, handleDataFromWweb} = useMenuController();
  return (
    <View style={{height: '100%'}}>
      {webViewLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size={'large'} />
        </View>
      )}
      <WebView
        ref={webViewRef}
        source={{uri: 'http://192.168.0.107:3000?ismobapp=1'}}
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
