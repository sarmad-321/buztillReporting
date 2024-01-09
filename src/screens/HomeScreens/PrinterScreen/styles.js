import {StyleSheet} from 'react-native';
import {vh, vw} from '../../../utils/units';
import {colors} from '../../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  addBtn: {
    width: vw * 12,
    alignSelf: 'flex-end',
    marginRight: vw * 5,
  },
  printListContainer: {
    backgroundColor: 'white',
    width: vw * 95,
    alignSelf: 'center',
    paddingBottom: vh * 3,
    height: vh * 75,
  },
  card: {
    height: vh * 25,
    width: vw * 25,
    marginTop: vh * 3,
    backgroundColor: 'white',
    marginHorizontal: vw * 1,
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c1c1c1',
  },
  circle: {
    width: vh * 4,
    height: vh * 4,
    borderRadius: vh * 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: 'white',
    top: '4%',
    alignSelf: 'flex-end',
    right: '5%',
  },
  icon: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  h1: {
    fontSize: vh * 3,
    marginTop: vh * 2,
    marginLeft: vw * 3,
    marginBottom: vh * 2,
  },
  status: {
    width: vh * 1.2,
    height: vh * 1.2,
    borderRadius: vh * 20,
    backgroundColor: colors.green,
    marginLeft: '2%',
  },
  printerIcon: {
    width: vh * 8,
    height: vh * 8,
    resizeMode: 'contain',
  },
  printerContainer: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
