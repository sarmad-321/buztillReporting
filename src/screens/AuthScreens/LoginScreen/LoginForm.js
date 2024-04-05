import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import InputField from '../../../components/InputField';
import MainButton from '../../../components/MainButton';
import {styles} from './styles';
import {icons} from '../../../assets';
import ArialBold from '../../../components/TextWrapper/ArialBold';
import InterMedium from '../../../components/TextWrapper/InterMedium';
import {colors} from '../../../utils/theme';
import CheckBox from '../../../components/Checkbox';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {vh} from '../../../utils/units';
import {useSelector} from 'react-redux';
import Error from '../../../components/Error';
import Animated, {
  FadeIn,
  LightSpeedInRight,
  LightSpeedOutLeft,
} from 'react-native-reanimated';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email('Email is not valid'),
  password: Yup.string()
    .required()
    .min(6, 'Password should be atleast 6 characters'),
});

const LoginForm = ({
  onLoginPress,
  error,
  setCurrentForm,
  width,
  store,
  currentForm,
}) => {
  const [validateOnChange, setValidateOnChange] = useState(false);
  const btnLoader = useSelector(state => state.general.btnLoader);
  const rememberState = useSelector(state => state.general.rememberMe);
  const savedUser = useSelector(state => state.general.savedUser);
  const [rememberMe, setRememberMe] = useState(rememberState);
  const scrollRef = useRef();
  const passwordRef = useRef();
  return (
    <View style={[styles.innerForm, width > 500 && {marginHorizontal: '13%'}]}>
      {currentForm == 'Login' && (
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
          <Text style={{color: colors.primary, fontSize: 14}}>
            Not Your Store ?
          </Text>
        </Animated.View>
      )}
      {error && (
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={LightSpeedOutLeft.duration(100)}>
          <Error text={error} />
        </Animated.View>
      )}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{paddingBottom: vh * 0}}
        showsVerticalScrollIndicator={false}>
        <ArialBold style={styles.heading}>Sign in </ArialBold>
        <Text>Sign in with your credentials</Text>
        <Formik
          initialValues={{email: savedUser.email, password: savedUser.password}}
          onSubmit={values => onLoginPress(values, rememberMe)}
          validateOnChange={validateOnChange}
          validationSchema={validationSchema}>
          {({handleChange, errors, handleSubmit, values}) => (
            <View>
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
              <View style={styles.rememberContainer}>
                <CheckBox
                  onChange={value => {
                    setRememberMe(value);
                  }}
                  defaultState={rememberMe}
                  label="Remember Me"
                />
                <TouchableOpacity onPress={() => setCurrentForm('ForgetPass')}>
                  <Text style={styles.forgetPass}>Forget Password?</Text>
                </TouchableOpacity>
              </View>

              <MainButton
                title={'Login'}
                loading={btnLoader}
                onPress={() => {
                  setValidateOnChange(true);
                  handleSubmit();
                }}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default LoginForm;
