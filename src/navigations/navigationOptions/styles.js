import {colors} from '../../utils/theme';
import {vh, vw} from '../../utils/units';

const {StyleSheet} = require('react-native');

export const styles = StyleSheet.create({
  infoContainer: {
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    // width: '40%',
  },
  roleContainer: {
    backgroundColor: '#e3e3e3',
    height: 20,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  text: {
    color: 'black',
    fontSize: 14,
  },
  profileContainer: {
    height: 50,
    width: 50,
    borderRadius: vh * 100,
    marginLeft: 10,
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
    marginRight: vw * 3,
  },
  flag: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginRight: 10,
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginLeft: 5,
    marginRight: 20,
  },
});
