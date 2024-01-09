import {View, Text, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import React, {useImperativeHandle, useRef, useState} from 'react';
import PopupWrapper from '../popupWrapper';
import {styles} from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InputField from '../../InputField';
import {vh, vw} from '../../../utils/units';
import SelectDropDown from '../../Dropdown';
import ArialBold from '../../TextWrapper/ArialBold';
import MainButton from '../../MainButton';
import DropdownField from '../../InputField/dropdownField';
import CheckBox from '../../Checkbox';
import {Switch} from 'react-native-gesture-handler';
import {colors} from '../../../utils/theme';
import {Formik} from 'formik';
import * as Yup from 'yup';

const printerModels = [
  {label: 'EU-m30', name: 'EU-m30'},
  {label: 'TM-T20X', name: 'TM-T20X'},
  {label: 'TM-H6000IV-DT', name: 'TM-H6000IV-DT'},
  {label: 'TM-T60', name: 'TM-T60'},
  {label: 'TM-H6000V', name: 'TM-H6000V'},
  {label: 'TM-T70', name: 'TM-T70'},
  {label: 'TM-L100', name: 'TM-L100'},
  {label: 'TM-T70-i', name: 'TM-T70-i'},
  {label: 'TM-L90 Liner-Free Label', name: 'TM-L90 Liner-Free Label'},
  {label: 'TM-T70II', name: 'TM-T70II'},
  {label: 'TM-m10', name: 'TM-m10'},
  {label: 'TM-T70II-DT', name: 'TM-T70II-DT'},
  {label: 'TM-m30', name: 'TM-m30'},
  {label: 'TM-T70II-DT2', name: 'TM-T70II-DT2'},
  {label: 'TM-m30II', name: 'TM-m30II'},
  {label: 'TM-T81II', name: 'TM-T81II'},
  {label: 'TM-m30II-H', name: 'TM-m30II-H'},
  {label: 'TM-T81III', name: 'TM-T81III'},
  {label: 'TM-m30II-NT', name: 'TM-m30II-NT'},
  {label: 'TM-T82', name: 'TM-T82'},
  {label: 'TM-m30II-S', name: 'TM-m30II-S'},
  {label: 'TM-T82II', name: 'TM-T82II'},
  {label: 'TM-m30II-SL', name: 'TM-m30II-SL'},
  {label: 'TM-T82II-i', name: 'TM-T82II-i'},
  {label: 'TM-m30III', name: 'TM-m30III'},
  {label: 'TM-T82III', name: 'TM-T82III'},
  {label: 'TM-m30III-H', name: 'TM-m30III-H'},
  {label: 'TM-T82IIIL', name: 'TM-T82IIIL'},
  {label: 'TM-m50', name: 'TM-m50'},
  {label: 'TM-T82X', name: 'TM-T82X'},
  {label: 'TM-m50II', name: 'TM-m50II'},
  {label: 'TM-T83II', name: 'TM-T83II'},
  {label: 'TM-m50II-H', name: 'TM-m50II-H'},
  {label: 'TM-T83II-i', name: 'TM-T83II-i'},
  {label: 'TM-P20', name: 'TM-P20'},
  {label: 'TM-T83III', name: 'TM-T83III'},
  {label: 'TM-P20II', name: 'TM-P20II'},
  {label: 'TM-T88V', name: 'TM-T88V'},
  {label: 'TM-P60', name: 'TM-P60'},
  {label: 'TM-T88V-i', name: 'TM-T88V-i'},
  {label: 'TM-P60II', name: 'TM-P60II'},
  {label: 'TM-T88V-DT', name: 'TM-T88V-DT'},
  {label: 'TM-P80', name: 'TM-P80'},
  {label: 'TM-T88VI', name: 'TM-T88VI'},
  {label: 'TM-P80II', name: 'TM-P80II'},
  {label: 'TM-T88VI-iHUB', name: 'TM-T88VI-iHUB'},
  {label: 'TM-T100', name: 'TM-T100'},
  {label: 'TM-T88VII', name: 'TM-T88VII'},
  {label: 'TM-T88VI-DT2', name: 'TM-T88VI-DT2'},
  {label: 'TM-T20', name: 'TM-T20'},
  {label: 'TM-T88VI-DT2', name: 'TM-T88VI-DT2'},
  {label: 'TM-T20II (**7 model)', name: 'TM-T20II (**7 model)'},
  {label: 'TM-T90II', name: 'TM-T90II'},
  {label: 'TM-T20II-i', name: 'TM-T20II-i'},
  {label: 'TM-U220', name: 'TM-U220'},
  {label: 'TM-T20II-m', name: 'TM-T20II-m'},
  {label: 'TM-U220-i', name: 'TM-U220-i'},
  {label: 'TM-T20III', name: 'TM-T20III'},
  {label: 'TM-U330', name: 'TM-U330'},
  {label: 'TM-T20IIIL', name: 'TM-T20IIIL'},
];

const printerTypes = [
  {label: 'Wifi', value: 'wifi'},
  {label: 'Bluetooth', value: 'bluetooth'},
];
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email('Email is not valid'),
  password: Yup.string()
    .required()
    .min(6, 'Password should be atleast 6 characters'),
});

const PrinterPopup = props => {
  const popup = useRef(null);
  const printerListRef = useRef();
  const printerTypeRef = useRef();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [validateOnChange, setValidateOnChange] = useState(false);

  const inititalValues = {};
  const [accept, setAccept] = useState(false);
  useImperativeHandle(props?.reference, () => ({
    hide: hide,
    show: show,
  }));

  const show = () => {
    popup?.current?.show();
  };

  const hide = () => {
    popup?.current?.hide();
    if (props.onHide) {
      props.onHide();
    }
    setAccept(false);
  };

  return (
    <PopupWrapper reference={popup}>
      <View style={styles.container}>
        {/* <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            flex: 1,
            paddingVertical: vh * 7,
          }}> */}
        <KeyboardAwareScrollView
          style={{width: '100%'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}>
          <Formik
            initialValues={inititalValues}
            onSubmit={values => onLoginPress(values, rememberMe)}
            validateOnChange={validateOnChange}
            validationSchema={validationSchema}>
            {({handleChange, errors, handleSubmit, values}) => (
              <View>
                <InputField label="Name" placeholder="Printer Name" />
                <DropdownField
                  dropdown={true}
                  values={printerTypes}
                  onDropdownPress={() => printerTypeRef.current.show()}
                  label="Type"
                  placeholder="Wifi"
                />
                <DropdownField
                  dropdown={true}
                  values={printerModels}
                  onDropdownPress={() => printerListRef.current.show()}
                  label="List of printers"
                  placeholder="Select Printers"
                />
                <InputField label="Title" placeholder="Print Title" />
                <InputField label="Subtitle 1" placeholder="Subtitle 1" />
                <InputField label="Subtitle 2" placeholder="Subtitle 2" />

                <InputField label="Footer" placeholder="Printer Footer" />
                <InputField label="IP" placeholder="10:20:0:1" />
                <InputField label="PORT" placeholder="25701" />

                <View style={styles.checkboxContainer}>
                  <CheckBox
                    style={styles.checkbox}
                    label={'Show Served By'}
                    onChange={() => console.log('hello')}
                  />
                  <CheckBox
                    style={styles.checkbox}
                    label={'Show Header'}
                    onChange={() => console.log('hello')}
                  />
                  <CheckBox
                    style={styles.checkbox}
                    label={'Show Printer Products'}
                    onChange={() => console.log('hello')}
                  />
                  <CheckBox
                    style={styles.checkbox}
                    label={'Show Footer'}
                    onChange={() => console.log('hello')}
                  />
                  <CheckBox
                    style={styles.checkbox}
                    label={'Show DateTime'}
                    onChange={() => console.log('hello')}
                  />
                  <CheckBox
                    style={styles.checkbox}
                    label={'Show Outlet'}
                    onChange={() => console.log('hello')}
                  />
                  <CheckBox
                    style={styles.checkbox}
                    label={'Show Register'}
                    onChange={() => console.log('hello')}
                  />
                </View>
                <ArialBold style={styles.isActive}>Is Active :</ArialBold>
                <Switch
                  trackColor={{false: '#767577', true: colors.primary}}
                  thumbColor={'#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  style={{alignSelf: 'flex-start'}}
                  onValueChange={value => {
                    toggleSwitch(value);
                    console.log(value);
                  }}
                  value={isEnabled}
                />
                <MainButton title="Save" />
              </View>
            )}
          </Formik>
        </KeyboardAwareScrollView>
        {/* </KeyboardAvoidingView> */}
      </View>
      <SelectDropDown
        reference={printerListRef}
        values={printerModels}
        onChangeValue={item => console.log(item)}
      />
      <SelectDropDown
        reference={printerTypeRef}
        values={printerTypes}
        onChangeValue={item => console.log(item)}
      />
    </PopupWrapper>
  );
};

export default PrinterPopup;
