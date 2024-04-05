import {useEffect, useState} from 'react';
import {
  VerifyStoreRegistration,
  saveLoginDetails,
  storeData,
  userForgotPass,
  userLogin,
} from '../../../store/slices/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  onMenuChange,
  toggleBtnLoader,
  toggleRememberMe,
} from '../../../store/slices/generalSlice';

const useLoginController = () => {
  const [currentForm, setCurrentForm] = useState('Store');
  const store = useSelector(state => state.user.store);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (store) {
      setCurrentForm('Login');
    } else {
      setCurrentForm('Store');
    }
  }, [store]);

  const onNextPress = async storeName => {
    setError('');
    let body = {
      storeURL: storeName.name,
    };
    dispatch(toggleBtnLoader(true));
    const res = await dispatch(VerifyStoreRegistration(body)).unwrap();
    dispatch(toggleBtnLoader(false));
    if (res.data) {
      let data = {
        storeName: res.data.storeName,
        storeHash: res.data.storeHash,
        reqNo: res.data.reqNo,
      };
      dispatch(storeData(data));
    } else {
      setError(res.msgDescription);
    }
  };

  const onLoginPress = async (loginData, remember) => {
    setError('');
    let payload = {
      remember: remember,
      email: loginData.email,
      password: loginData.password,
    };
    dispatch(toggleRememberMe(payload));
    let data = {
      apiData: {
        loginName: loginData.email,
        userPassword: loginData.password,
        StoreName: store.storeName,
      },
      headers: {
        'Content-Type': 'application/json',
        'X-STORE-HASH': store.storeHash,
        'X-STORE-NAME': store.storeName,
        'X-LANG': 1,
      },
    };
    dispatch(toggleBtnLoader(true));
    const response = await dispatch(userLogin(data)).unwrap();
    console.log(response, 'response');
    dispatch(toggleBtnLoader(false));

    if (response.data) {
      dispatch(saveLoginDetails(response.data));
      navigation.replace('HomeNavigator');
      dispatch(onMenuChange('Dashboard'));
    } else {
      setError(response.msgDescription);
    }
  };

  const onForgetEmail = async (loginData, remember) => {
    setError('');

    let data = {
      apiData: {
        loginName: loginData.email,
      },
      headers: {
        'Content-Type': 'application/json',
        'X-STORE-HASH': store.storeHash,
        'X-STORE-NAME': store.storeName,
        'X-LANG': 1,
      },
    };
    dispatch(toggleBtnLoader(true));
    console.log(data, 'data for forget pass');
    const response = await dispatch(userForgotPass(data)).unwrap();
    console.log(response, 'response');
    dispatch(toggleBtnLoader(false));
    if (response.data) {
      setSuccessMsg('Email has been sent to your email address');
    } else {
      setError(response.msgDescription);
    }
  };

  const notYourStorePress = () => {
    dispatch(storeData(null));
  };

  return {
    currentForm,
    setCurrentForm,
    onNextPress,
    store,
    notYourStorePress,
    onLoginPress,
    error,
    onForgetEmail,
    successMsg,
    setSuccessMsg,
  };
};

export default useLoginController;
