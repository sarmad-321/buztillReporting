import {StyleSheet} from 'react-native';
import {vh, vw} from '../../../utils/units';
import {colors} from '../../../utils/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '3%',
    marginTop: vh * 3,
    backgroundColor: 'white',
    paddingHorizontal: '2%',
    paddingVertical: vh * 2,
  },
  formContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  margin: {
    marginRight: vw * 2,
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '60%',
  },
  checkbox: {
    marginRight: vw * 2,
    width: vw * 10,
    marginVertical: vh * 1,
  },
  isActive: {
    marginRight: vw * 0.5,
  },
  radioButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: vw * 2,
    flexDirection: 'row',
    alignItems: 'center',
    bottom: vh * 2,
  },
  backBtn: {
    borderRadius: 4,
    width: vw * 20,
    backgroundColor: colors.red,
    marginRight: vw * 2,
  },
  saveBtn: {
    borderRadius: 4,
    width: vw * 15,
  },
  rowDirection: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: vh * 2,
  },
  iconContainer: {
    height: vh * 3,
    width: vh * 3,
    resizeMode: 'contain',
    marginBottom: vh * 3,
  },
  backIcon: {
    height: '100%',
    width: '100%',
  },
});
