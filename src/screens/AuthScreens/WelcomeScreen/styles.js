import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  formContainer: {
    width: '50%',
    height: '100%',
    paddingHorizontal: 50,
  },
  swiperContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.primary,
    width: '50%',
  },
});
