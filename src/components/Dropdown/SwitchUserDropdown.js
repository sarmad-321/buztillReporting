import {View, Modal, FlatList, TouchableOpacity, Text, Pressable} from 'react-native';
import React, {useState, useImperativeHandle} from 'react';
import Animated, {SlideInDown} from 'react-native-reanimated';
import {vh} from '../../utils/units';

import {styles} from './languageStyles';

const SwitchUserDropdown = props => {
  const [visible, setVisible] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const data = [
    {
      label: 'Logout',
      value: 'logout',
    },
    {
      label: 'Switch User',
      value: 'switch',
    },
  ];
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
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: '4%',
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
      <Pressable 
      onPress={()=> setVisible(false)}
      style={styles.mainContainer}>
        <View
          style={[
            styles.innerContainer,
            {height: getHeight(), marginLeft: '70%'},
          ]}>
          <View style={styles.notch}></View>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={item => renderItem(item)}
            horizontal={false}
          />
        </View>
      </Pressable>
    </Modal>
  );
};
export default SwitchUserDropdown;
