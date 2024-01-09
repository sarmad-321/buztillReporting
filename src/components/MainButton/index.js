import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {vh, vw} from '../../utils/units';
import {colors} from '../../utils/theme';

const MainButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.7}
      disabled={props.loading || false}
      {...props}
      style={[styles.container, props.style]}>
      {props.loading ? (
        <ActivityIndicator size={'small'} color={'white'} />
      ) : (
        <Text
          style={[
            styles.buttonText,
            {
              borderRadius: vw * 1,
            },
          ]}>
          {props.title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  container: {
    height: vh * 5,
    width: '100%',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vw * 0.7,
    marginVertical: vh * 2,
  },
  buttonText: {
    color: 'white',
    fontSize: vh * 2,
    fontWeight: 'bold',
  },
});
