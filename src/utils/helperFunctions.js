import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

export const toastConfig = {
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  success: props => (
    <BaseToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      style={{borderLeftColor: 'green', width: '80%'}}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      style={{borderLeftColor: 'red', width: '80%'}}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
};

export const showToast = (type, message) => {
  switch (type) {
    case 'success':
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: message,
      });

      break;
    case 'error':
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
      break;
    case 'success':
      break;

    default:
      break;
  }
};
