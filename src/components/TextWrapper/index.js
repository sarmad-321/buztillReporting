import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {vh} from '../../utils/units';

export default function TextWrapper(props) {
  return (
    <Text
      {...props}
      style={[styles.text, props?.style]}
      ellipsizeMode="tail"
      adjustsFontSizeToFit={false}
      allowFontScaling={false}>
      {props.children}
    </Text>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: 'black',
  },
});
