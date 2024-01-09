import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {MobDataTypes, PostAppTypes} from '../../../utils/constants';
import {EventRegister} from 'react-native-event-listeners';
import {getMenusService} from '../../../api/Auth';
import {
  logout,
  saveOutlet,
  saveRegister,
} from '../../../store/slices/userSlice';
import NetInfo from '@react-native-community/netinfo';
import {onMenuChange} from '../../../store/slices/generalSlice';
import {useTranslation} from 'react-i18next';
import i18next from 'i18next';
import ThermalPrinterModule from 'react-native-thermal-printer';

const useMenuController = () => {
  const webViewRef = useRef(null);
  const user = useSelector(state => state.user);
  const [webViewLoading, setWebViewLoading] = useState(true);
  const currentLanguage = useSelector(state => state.general.currentLanguage);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentLanguage) {
      let data = {
        type: MobDataTypes.LANGUAGE,
        payload: currentLanguage,
      };
      sendToWeb(data);
    }
  }, [currentLanguage]);

  useEffect(() => {
    // handleTestPrint(
    //   '\n\n[C]<b>Main Outlet</b>\n\n\n[C]Eric (3)\n\n[C]* * *Reprint* * *\n\n[C]================================\n\n[C]Receipt 176\n\n[C]Wednesday, January 3, 2024 7:59 PM\n\n\n\n\n[C]================================\n',
    // );
    const unsubscribe = NetInfo.addEventListener(state => {
      handleConnectivityChange(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //This use effect gets the data from drawer, when the drawer menu button press it returns that data
  useEffect(() => {
    let drawerEvent;
    let registerEvent;
    let switchUserEvent;
    let languageEvent;
    if (webViewRef.current.injectJavaScript) {
      drawerEvent = EventRegister.addEventListener('drawerPressEvent', item => {
        let data = {
          type: MobDataTypes.ROUTES,
          payload: item.url,
        };
        sendToWeb(data);
      });

      registerEvent = EventRegister.addEventListener('register', item => {
        let data = {
          type: MobDataTypes.REGISTER_POPUP,
          payload: true,
        };
        sendToWeb(data);
      });

      switchUserEvent = EventRegister.addEventListener('switchUser', item => {
        let data = {
          type: MobDataTypes.LOGIN,
          loginDetails: item,
        };
        sendToWeb(data);
      });
      languageEvent = EventRegister.addEventListener('language', item => {
        let data = {
          type: MobDataTypes.LANGUAGE,
          payload: item,
        };
        sendToWeb(data);
      });
    }
    return () => {
      EventRegister.removeEventListener(drawerEvent);
      EventRegister.removeEventListener(registerEvent);
      EventRegister.removeEventListener(switchUserEvent);
      EventRegister.removeEventListener(languageEvent);
    };
    // EventRegister.addEventListener('logout', item => {
    //   let data = {
    //     type: MobDataTypes.LOGOUT,
    //     payload: true,
    //   };
    //   sendToWeb(data);
    //   dispatch(logout());
    // });
  }, [webViewRef]);

  const onUrlLoaded = () => {
    let data = {
      payload: {
        loginDetails: user?.loginDetails,
        storeInfo: user?.store,
      },
      type: MobDataTypes.LOGIN,
    };
    if (webViewRef?.current?.injectJavaScript) {
      sendToWeb(data);
    }
  };

  const sendToWeb = data => {
    const message = JSON.stringify(data);
    console.log(message);
    webViewRef.current.injectJavaScript(
      `window.recieveDataFromApp(${message})`,
    );
  };

  const handleConnectivityChange = connected => {
    let data = {
      payload: true,
      type: MobDataTypes.NETWORK,
    };
    sendToWeb(data);
  };

  const handleDataFromWweb = data => {
    switch (data.type) {
      case PostAppTypes.LOGIN_DONE:
        setWebViewLoading(false);
        break;
      case PostAppTypes.SETUP_DONE:
        onUrlLoaded();
        break;
      case PostAppTypes.LOGOUT:
        dispatch(logout());
        navigation.replace('AuthNavigator', {
          screen: 'LoginScreen',
        });
        break;
      case PostAppTypes.OUTLET:
        dispatch(saveOutlet(data.payload));
        break;
      case PostAppTypes.REGISTER:
        dispatch(saveRegister(data.payload));
        break;
      case PostAppTypes.PAGE_HEADER:
        dispatch(onMenuChange(data.payload));
        break;
      case PostAppTypes.RECIEPT_PRINT:
        handleTestPrint(data.payload);
        break;
      default:
        break;
    }
  };
  const handleTestPrint = async data => {
    try {
      let printString = data.content + '\n[L]';
      const config = {
        ip: data.ip,
        port: parseInt(data.port),
        payload: printString,
        autoCut: true,
        openCashbox: false,
        printerDpi: 203,
        printerWidthMM: 80,
        printerNbrCharactersPerLine: 42,
        timeout: 30000,
      };
      await ThermalPrinterModule.printTcp(config);
    } catch (err) {
      // Handle error
      console.log(JSON.stringify(err));
      console.log(err.message);
    }
  };
  return {
    webViewLoading,
    webViewRef,
    handleDataFromWweb,
  };
};

export default useMenuController;
