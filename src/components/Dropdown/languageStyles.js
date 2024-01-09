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
    height: vh * 4.5,
  },
  h1: {fontSize: vh * 1.8, color: 'black', textAlign: 'center'},
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
    height: vh * 90,
    backgroundColor: 'white',
    marginTop: '7%',
    width: '15%',
    marginLeft: '35%',
  },
  notch: {
    width: vh * 4,
    height: vh * 4,
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 100,
    top: -vh * 1,
    right: vw * 1,
    transform: 'rotate(45deg)', // Rotate by 45 degrees
  },
});
