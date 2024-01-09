import {View, Switch, TouchableOpacity, Image} from 'react-native';
import React, {useImperativeHandle, useRef, useState} from 'react';
import {styles} from './styles';

import {Formik} from 'formik';
import * as Yup from 'yup';
import DropdownField from '../../../components/InputField/dropdownField';
import InputField from '../../../components/InputField';
import CheckBox from '../../../components/Checkbox';
import ArialBold from '../../../components/TextWrapper/ArialBold';
import MainButton from '../../../components/MainButton';
import {colors} from '../../../utils/theme';
import SelectDropDown from '../../../components/Dropdown';
import {icons} from '../../../assets';
import useAddNewPrinterController from './useAddNewPrinterController';
import {useSelector} from 'react-redux';
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

const printerDropDown = [
  {label: 'Wifi', value: 2},
  {label: 'Bluetooth', value: 1},
];
const printerTypes = ['Bluetooth', 'Wifi'];

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  type: Yup.string().required(),
  ip: Yup.string().required(),
  type: Yup.number().required(),
  isActive: Yup.boolean().required(),
  footer: Yup.string(),
  header: Yup.string().required('Title is required'),
  showDatetime: Yup.boolean().required(),
  showOutlet: Yup.boolean().required(),
  showRegister: Yup.boolean().required(),
  showServedBy: Yup.boolean().required(),
  subtitle1: Yup.string(),
  subtitle2: Yup.string(),
});

const AddNewPrinter = props => {
  const printerListRef = useRef();
  const printerTypeRef = useRef();
  const [validateOnChange, setValidateOnChange] = useState(false);
  const {handleSave} = useAddNewPrinterController();
  const btnLoader = useSelector(state => state.general.btnLoader);
  const printer = props.route.params?.printer;
  const inititalValues = {
    name: '',
    ip: '',
    port: '',
    type: '',
    isActive: '',
    footer: '',
    header: '',
    showDatetime: false,
    showOutlet: false,
    showRegister: false,
    showServedBy: false,
    showHeader: false,
    showProducts: false,
    showFooter: false,
    subtitle1: '',
    subtitle2: '',
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
        style={styles.iconContainer}>
        <Image source={icons.back} style={styles.backIcon} />
      </TouchableOpacity>
      <Formik
        initialValues={printer || inititalValues}
        onSubmit={values => handleSave(values, printer)}
        validateOnChange={validateOnChange}
        validationSchema={validationSchema}>
        {({handleChange, errors, handleSubmit, setFieldValue, values}) => (
          <View style={{}}>
            <View style={styles.formContainer}>
              <InputField
                label="Name"
                placeholder="Printer Name"
                style={styles.margin}
                onChangeText={handleChange('name')}
                value={values.name}
                error={errors.name}
              />
              <DropdownField
                dropdown={true}
                values={printerTypes}
                onDropdownPress={() => printerTypeRef.current.show()}
                label="Type"
                placeholder="Wifi"
                style={styles.margin}
                value={printerTypes[values.type - 1]}
                error={errors.type}
              />
              {/* <DropdownField
                dropdown={true}
                style={styles.margin}
                values={printerModels}
                onDropdownPress={() => printerListRef.current.show()}
                label="List of printers"
                placeholder="Select Printers"
              /> */}
              <InputField
                style={styles.margin}
                label="Title"
                placeholder="Print Title"
                value={values.header}
                error={errors.header}
                onChangeText={handleChange('header')}
              />
              <InputField
                style={styles.margin}
                label="Subtitle 1"
                placeholder="Subtitle 1"
                value={values.subtitle1}
                error={errors.subtitle1}
                onChangeText={handleChange('subtitle1')}
              />
              <InputField
                style={styles.margin}
                label="Subtitle 2"
                placeholder="Subtitle 2"
                value={values.subtitle2}
                error={errors.subtitle2}
                onChangeText={handleChange('subtitle2')}
              />

              <InputField
                style={styles.margin}
                label="Footer"
                placeholder="Printer Footer"
                value={values.footer}
                error={errors.footer}
                onChangeText={handleChange('footer')}
              />
              <InputField
                style={styles.margin}
                label="IP"
                placeholder="10:20:0:1"
                value={values.ip}
                error={errors.ip}
                onChangeText={handleChange('ip')}
              />
              <InputField
                style={styles.margin}
                label="PORT"
                placeholder="25701"
                value={values.port}
                error={errors.port}
                onChangeText={handleChange('port')}
              />

              <View style={styles.checkboxContainer}>
                <CheckBox
                  style={styles.checkbox}
                  label={'Show Served By'}
                  defaultState={values.showServedBy}
                  onChange={value => setFieldValue('showServedBy', value)}
                />
                <CheckBox
                  style={styles.checkbox}
                  label={'Show Header'}
                  defaultState={values.showHeader}
                  onChange={value => setFieldValue('showHeader', value)}
                />
                <CheckBox
                  style={styles.checkbox}
                  defaultState={values.showProducts}
                  label={'Show Printer Products'}
                  onChange={value => setFieldValue('showProducts', value)}
                />
                <CheckBox
                  style={styles.checkbox}
                  label={'Show Footer'}
                  defaultState={values.showFooter}
                  onChange={value => setFieldValue('showFooter', value)}
                />
                <CheckBox
                  style={styles.checkbox}
                  defaultState={values.showDatetime}
                  label={'Show DateTime'}
                  onChange={value => setFieldValue('showDatetime', value)}
                />
                <CheckBox
                  style={styles.checkbox}
                  defaultState={values.showOutlet}
                  label={'Show Outlet'}
                  onChange={value => setFieldValue('showOutlet', value)}
                />
                <CheckBox
                  style={styles.checkbox}
                  label={'Show Register'}
                  defaultState={values.showRegister}
                  onChange={value => setFieldValue('showServedBy', value)}
                />
              </View>
              <View style={styles.radioButton}>
                <ArialBold style={styles.isActive}>Is Active :</ArialBold>
                <Switch
                  trackColor={{false: '#767577', true: colors.primary}}
                  thumbColor={'#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  style={{alignSelf: 'flex-start'}}
                  onValueChange={value => {
                    setFieldValue('isActive', value);
                    console.log(value);
                  }}
                  value={values.isActive}
                />
              </View>
              <SelectDropDown
                reference={printerListRef}
                values={printerModels}
                onChangeValue={item => console.log(item)}
              />
              <SelectDropDown
                reference={printerTypeRef}
                values={printerDropDown}
                onChangeValue={item => setFieldValue('type', item.value)}
              />
            </View>
            <View style={styles.rowDirection}>
              <MainButton
                title={printer ? 'Update' : 'Add'}
                loading={btnLoader}
                style={styles.saveBtn}
                onPress={() => {
                  setValidateOnChange(true);
                  handleSubmit();
                }}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AddNewPrinter;
