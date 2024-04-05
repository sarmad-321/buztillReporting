import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {vh, vw} from '../../utils/units';
import {icons} from '../../assets';
import {colors} from '../../utils/theme';

const CheckBox = props => {
  const [isChecked, setIsChecked] = useState(props.defaultState);
  useEffect(() => {
    props.onChange(isChecked);
  }, [isChecked]);
  return (
    <TouchableOpacity
      onPress={() => setIsChecked(!isChecked)}
      activeOpacity={0.5}
      style={[styles.container, props.style]}>
      <View
        style={[
          styles.box,
          isChecked && {
            backgroundColor: colors.primary,
            borderColor: colors.primary,
          },
        ]}>
        {isChecked && <Image source={icons.tick} style={styles.icon} />}
      </View>
      <Text>{props.label}</Text>
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    borderWidth: 1,
    width: 16,
    height: 16,
    borderRadius: 2,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: '50%',
    width: '50%',
    resizeMode: 'contain',
  },
});
