import {StyleSheet} from 'react-native';
import {vh, vw} from '../../utils/units';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: 40,
    minWidth: vw * 17,
    marginVertical: 5,
    alignItems: 'center',
    paddingHorizontal: '3%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 3,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    width: '80%',
    height: '100%',
    alignSelf: 'center',
  },
  rightContainer: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcon: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  iconContainer: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -vw * 0.5,
  },
  error: {
    color: 'red',
  },
});
