import {colors} from '../../utils/theme';
import {vh, vw} from '../../utils/units';

const {StyleSheet} = require('react-native');

export const styles = StyleSheet.create({
  infoContainer: {
    height: vh * 7,
    width: vh * 50,
    marginRight: vw * 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleContainer: {
    backgroundColor: '#e3e3e3',
    height: vh * 3,
    width: vw * 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  text: {
    color: 'black',
    fontSize: vh * 1.6,
  },
  profileContainer: {
    height: vh * 5,
    width: vh * 5,
    borderRadius: vh * 100,
    marginLeft: vw * 1,
    overflow: 'hidden',
  },
  profile: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
    marginRight: vw * 3,
  },
  flag: {
    width: vh * 3,
    height: vh * 3,
    resizeMode: 'contain',
    marginRight: vw * 1,
  },
  icon: {
    width: vh * 1.5,
    height: vh * 1.5,
    resizeMode: 'contain',
    marginLeft: vw * 1,
  },
});
