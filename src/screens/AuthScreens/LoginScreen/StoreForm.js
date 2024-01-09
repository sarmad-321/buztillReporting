import {ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react';
import InputField from '../../../components/InputField';
import MainButton from '../../../components/MainButton';
import {styles} from './styles';
import ArialBold from '../../../components/TextWrapper/ArialBold';
import {icons} from '../../../assets';
import InterMedium from '../../../components/TextWrapper/InterMedium';
import {colors} from '../../../utils/theme';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {useSelector} from 'react-redux';
import {vh} from '../../../utils/units';
import Error from '../../../components/Error';
import Animated, {FadeIn, LightSpeedOutLeft} from 'react-native-reanimated';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Store name is required'),
});

const StoreForm = ({onNextPress, error}) => {
  const [validateOnChange, setValidateOnChange] = useState(false);
  const btnLoader = useSelector(state => state.general.btnLoader);

  return (
    <View style={styles.innerForm}>
      {error && (
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={LightSpeedOutLeft.duration(100)}>
          <Error text={error} />
        </Animated.View>
      )}
      <ScrollView
        contentContainerStyle={{paddingBottom: vh * 0}}
        showsVerticalScrollIndicator={false}>
        <ArialBold style={styles.heading}>Find Your Store</ArialBold>
        <Text>Enter your Store Name to continue</Text>
        <Formik
          initialValues={{name: ''}}
          onSubmit={values => onNextPress(values)}
          validateOnChange={validateOnChange}
          validationSchema={validationSchema}>
          {({handleChange, errors, handleSubmit, values}) => (
            <View>
              <InputField
                rightText={'.buzztill.com'}
                onChangeText={handleChange('name')}
                returnKeyType="done"
                icon={icons.store}
                placeholder="Walltest"
                error={errors.name}
                onSubmitEditing={() => {
                  setValidateOnChange(true);
                  handleSubmit();
                }}
              />
              <MainButton
                title={'Next'}
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

export default StoreForm;
