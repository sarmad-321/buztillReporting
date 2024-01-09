import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TextWrapper from '.';

const ArialBold = props => {
  return (
    <TextWrapper {...props} style={[styles.font, props?.style]}>
      {props.children}
    </TextWrapper>
  );
};

export default ArialBold;

const styles = StyleSheet.create({
  font: {
    fontFamily: 'Arial-Rounded-Bold',
  },
});
