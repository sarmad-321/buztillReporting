import {
  Animated,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useImperativeHandle, useRef, useState} from 'react';
import PopupWrapper from '../popupWrapper';
import {styles} from './styles';
import ArialBold from '../../TextWrapper/ArialBold';
import InputField from '../../InputField';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import MainButton from '../../MainButton';
import {icons} from '../../../assets';
import {saveLoginDetails, userLogin} from '../../../store/slices/userSlice';
import {FadeIn, LightSpeedOutLeft} from 'react-native-reanimated';
import Error from '../../Error';
import {EventRegister} from 'react-native-event-listeners';
import {
  addMultipleUsers,
  toggleBtnLoader,
} from '../../../store/slices/generalSlice';

const predefinedColors = [
  '#ff5733', // Dark Orange
  '#1e90ff', // Dodger Blue
  '#2ecc71', // Emerald Green
  '#8e44ad', // Purple
  '#d35400', // Pumpkin
  '#3498db', // Blue
  '#27ae60', // Nephritis
  '#c0392b', // Red
  '#2980b9', // Belize Hole
  '#f39c12', // Orange
  '#2c3e50', // Dark Gray
  '#e74c3c', // Alizarin Red
  '#16a085', // Green Sea
  '#e67e22', // Carrot
  '#9b59b6', // Amethyst
];

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email('Email is not valid'),
  password: Yup.string()
    .required()
    .min(6, 'Password should be atleast 6 characters'),
});

const SwitchUserPopup = props => {
  const popup = useRef(null);
  const [validateOnChange, setValidateOnChange] = useState(false);
  const btnLoader = useSelector(state => state.general.btnLoader);
  const store = useSelector(state => state.user.store);
  const multipleUsers = useSelector(state => state.general.multipleUsers);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [userColors, setUserColors] = useState({});

  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const passwordRef = useRef();

  console.log(multipleUsers, 'multiple users ');
  useImperativeHandle(props?.reference, () => ({
    hide: hide,
    show: show,
  }));

  useEffect(() => {
    const myStoreUser = multipleUsers.filter(
      item => item.StoreName == store.storeName,
    );
    console.log(store.storeName, 'my store');
    setAvailableUsers(myStoreUser);
  }, [multipleUsers]);

  useEffect(() => {
    // Generate and set initial colors for each user
    const initialUserColors = {};
    availableUsers.forEach(user => {
      initialUserColors[user.loginName] = getRandomColorFromPredefined();
    });
    setUserColors(initialUserColors);
  }, [availableUsers]);

  const show = () => {
    popup?.current?.show();
  };

  const hide = () => {
    popup?.current?.hide();
    if (props.onHide) {
      props.onHide();
    }
  };

  function getRandomColorFromPredefined() {
    // Get a random color from the predefined array
    const randomIndex = Math.floor(Math.random() * predefinedColors.length);
    return predefinedColors[randomIndex];
  }

  const onSwitchPress = async loginData => {
    Keyboard.dismiss();
    setValidateOnChange(false);
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
    dispatch(toggleBtnLoader(false));

    if (response.data) {
      console.log(response.data, 'login Details');
      dispatch(
        addMultipleUsers({
          ...data.apiData,
          userName: response.data.userName,
        }),
      );
      dispatch(saveLoginDetails(response.data));
      EventRegister.emit('switchUser', response.data);
      hide();
      console.log(response.data);
    } else {
      setError(response.msgDescription);
    }
  };

  const handleUserPress = (item, setFieldValue) => {
    setFieldValue('email', item.loginName);
    setFieldValue('password', item.userPassword);
  };

  return (
    <PopupWrapper reference={popup}>
      <KeyboardAvoidingView style={styles.container}>
        {error && (
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={LightSpeedOutLeft.duration(100)}>
            <Error text={error} />
          </Animated.View>
        )}
        <ArialBold>Switch User</ArialBold>

        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={values => onSwitchPress(values)}
          validateOnChange={validateOnChange}
          validationSchema={validationSchema}>
          {({handleChange, errors, setFieldValue, handleSubmit, values}) => (
            <View>
              <FlatList
                data={availableUsers}
                horizontal
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => handleUserPress(item, setFieldValue)}
                      style={[styles.listContainer]}>
                      <View
                        style={[
                          styles.circle,
                          {
                            backgroundColor:
                              userColors[item.loginName] ||
                              getRandomColorFromPredefined(),
                          },
                        ]}>
                        <ArialBold style={styles.circleLabel}>
                          {item.loginName[0]}
                        </ArialBold>
                      </View>
                      <Text numberOfLines={1}>{item.userName}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
              <InputField
                name="email"
                returnKeyType="next"
                type="email"
                value={values.email}
                autoComplete="email"
                error={errors.email}
                onSubmitEditing={() => {
                  passwordRef.current.focus();
                }}
                onChangeText={handleChange('email')}
                icon={icons.user}
                placeholder="Enter your Email"
              />
              <InputField
                name="password"
                type="password"
                value={values.password}
                onChangeText={handleChange('password')}
                onSubmitEditing={() => {
                  setValidateOnChange(true);
                  handleSubmit();
                }}
                reference={passwordRef}
                icon={icons.lock}
                placeholder="Password"
                error={errors.password}
                secureTextEntry
              />
              <View style={styles.btnContainer}>
                <MainButton
                  title={'Close'}
                  style={{width: '47%', backgroundColor: '#ff4d4d'}}
                  onPress={() => {
                    hide();
                  }}
                />
                <MainButton
                  title={'Switch'}
                  loading={btnLoader}
                  style={{width: '47%'}}
                  onPress={() => {
                    setValidateOnChange(true);
                    handleSubmit();
                  }}
                />
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </PopupWrapper>
  );
};

export default SwitchUserPopup;
