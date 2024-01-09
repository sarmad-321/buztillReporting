import {View, Text, ScrollView} from 'react-native';
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
import Animated, {FadeIn, LightSpeedOutLeft} from 'react-native-reanimated';
import SuccessTag from '../../../components/SuccessTag';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email('Email is not valid'),
});

const ForgotPassForm = ({
  onForgetPress,
  setCurrentForm,
  error,
  successMsg,
  setSuccessMsg,
}) => {
  const [validateOnChange, setValidateOnChange] = useState(false);
  const btnLoader = useSelector(state => state.general.btnLoader);
  const scrollRef = useRef();
  const passwordRef = useRef();
  return (
    <View style={styles.innerForm}>
      {error && (
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={LightSpeedOutLeft.duration(100)}>
          <Error text={error} />
        </Animated.View>
      )}
      {successMsg && (
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={LightSpeedOutLeft.duration(100)}>
          <SuccessTag text={successMsg} />
        </Animated.View>
      )}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{paddingBottom: vh * 0}}
        showsVerticalScrollIndicator={false}>
        <ArialBold style={styles.heading}>Forget Password </ArialBold>
        <Text>Please Enter your email address</Text>
        <Formik
          initialValues={{email: ''}}
          onSubmit={values => onForgetPress(values)}
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
                  // passwordRef.current.focus();
                }}
                onChangeText={handleChange('email')}
                icon={icons.user}
                placeholder="Enter your Email"
              />
              <MainButton
                title={successMsg ? 'Go Back' : 'Next'}
                loading={btnLoader}
                onPress={() => {
                  console.log('test');
                  if (successMsg) {
                    setCurrentForm('Login');
                    setSuccessMsg('');
                  }
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

export default ForgotPassForm;
