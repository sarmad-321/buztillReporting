import {StyleSheet} from 'react-native';
import {vh, vw} from '../../utils/units';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 0.7,
    height: vh * 5.5,
    minWidth: vw * 17,
    marginVertical: vh * 1,
    alignItems: 'center',
    paddingHorizontal: '3%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: vw * 0.5,
    borderColor: 'red',
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
    width: vh * 4,
    height: vh * 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcon: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  iconContainer: {
    width: vh * 4,
    height: vh * 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -vw * 0.5,
  },
  error: {
    color: 'red',
  },
});
