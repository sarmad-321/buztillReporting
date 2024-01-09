import {StyleSheet} from 'react-native';
import {vh, vw} from '../../../utils/units';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // height: vh * 40,
    width: vw * 40,
    borderRadius: 5,
    paddingHorizontal: vw * 2,
    justifyContent: 'space-between',
    paddingVertical: '3%',
  },
  circle: {
    height: vh * 7,
    width: vh * 7,
    borderRadius: vh * 100,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: vh * 1,
  },
  listContainer: {
    marginVertical: vh * 2,

    alignItems: 'center',
    width: vw * 7,
  },
  circleLabel: {
    fontSize: vh * 4,
    // fontWeight: 'bold',
    color: 'white',
    top: '-3%',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {},
});
