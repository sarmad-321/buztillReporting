import {
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  Text,
  Pressable,
} from 'react-native';
import React, {useState, useImperativeHandle} from 'react';
import Animated, {SlideInDown} from 'react-native-reanimated';
import {vh} from '../../utils/units';
import {colors} from '../../utils/theme';
import ArialBold from '../TextWrapper/ArialBold';
import {styles} from './languageStyles';

const LanguageDropDown = props => {
  const [visible, setVisible] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  useImperativeHandle(props?.reference, () => ({
    hide: hide,
    show: show,
  }));

  const hide = onCancel => {
    setVisible(false);
    if (typeof onCancel === 'function') {
      onCancel();
    } else {
      if (props.onCancel) {
        props.onCancel();
      }
    }
  };
  const show = onShow => {
    setVisible(true);
    if (typeof onShow === 'function') {
      onShow();
    } else {
      if (props.onShow) {
        props.onShow();
      }
    }
  };
  const getHeight = () => {
    if (props?.values?.length > 18) {
      return vh * 90;
    }
    if (props?.values?.length > 10) {
      return vh * 20;
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <Animated.View
        entering={SlideInDown.duration((index + 1) * 50)}
        style={styles.field}>
        <TouchableOpacity
          style={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setVisible(false);
            props.onChangeValue(item);
          }}>
          <Text style={styles.h1}>{item.label}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };
  return (
    <Modal
      transparent={true}
      statusBarTranslucent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
      style={styles.modal}>
      <Pressable onPress={() => setVisible(false)} style={styles.mainContainer}>
        <View style={[styles.innerContainer, {height: getHeight()}]}>
          <View style={styles.notch}></View>
          <FlatList
            data={props.values}
            showsVerticalScrollIndicator={false}
            renderItem={item => renderItem(item)}
            horizontal={false}
          />
        </View>
      </Pressable>
    </Modal>
  );
};
export default LanguageDropDown;
