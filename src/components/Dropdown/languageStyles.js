import {StyleSheet} from 'react-native';
import {colors} from '../../utils/theme';
import {vh, vw} from '../../utils/units';

export const styles = StyleSheet.create({
  field: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
    height: 35,
    paddingHorizontal: 40,
  },
  h1: {fontSize: 16, color: 'black', textAlign: 'center'},
  modal: {
    flex: 1,
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00000054',
    paddingBottom: vh * 5,
  },
  innerContainer: {
    borderRadius: 20,
    marginTop: 90,

    // width: '15%',
    marginLeft: '45%',
  },
  notch: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 100,
    top: -5,
    right: 10,
    transform: 'rotate(45deg)', // Rotate by 45 degrees
  },
});
