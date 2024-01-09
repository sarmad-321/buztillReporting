import {StyleSheet} from 'react-native';
import {vh, vw} from '../../../utils/units';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: vh * 90,
    width: vw * 40,
    borderRadius: 5,
    paddingHorizontal: vw * 2,
  },
  switchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    position: 'absolute',
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkbox: {
    marginRight: vw * 2,
    // width: vw * 10,
    marginVertical: vh * 1,
  },
  isActive: {
    marginTop: vh * 2,
  },
});
