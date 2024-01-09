import React, {useState, useImperativeHandle} from 'react';
import {KeyboardAvoidingView, Modal, StyleSheet, View} from 'react-native';
import {colors} from '../../../utils/theme';
import {vw} from '../../../utils/units';

const PopupWrapper = props => {
  const [visible, setVisible] = useState(false);
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
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={() => setVisible(false)}
      style={styles.modal}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Specify behavior based on platform
        style={styles.keyboardAvoidingView}>
        <View style={styles.mainContainer}>{props.children}</View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightShade,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-end', // Move content to the bottom of the screen
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  contentContainer: {
    // backgroundColor: "white",
    width: vw * 100,
    position: 'absolute',
  },
});
export default PopupWrapper;
