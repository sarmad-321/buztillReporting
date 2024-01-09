import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TextWrapper from '.';

const InterMedium = props => {
  return (
    <TextWrapper {...props} style={[styles.font, props?.style]}>
      {props.children}
    </TextWrapper>
  );
};

export default InterMedium;

const styles = StyleSheet.create({
  font: {
    fontFamily: 'Inter-Medium',
    color: 'black',
  },
});
