import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/theme';
import {vh, vw} from '../../../utils/units';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  formContainer: {
    width: '50%',
    // height: '100%',
    paddingHorizontal: '3%',
  },
  swiperContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.primary,
    width: '50%',
  },
  innerForm: {
    paddingHorizontal: '14%',
    // marginTop: vh * 5,
  },
  heading: {
    fontSize: vh * 2.7,
    marginBottom: '2%',
  },
  slide: {
    height: vh * 100,
    paddingHorizontal: '5%',
    justifyContent: 'space-around',
  },
  image: {
    width: vh * 40,
    height: vh * 40,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: '10%',
  },
  subHeading: {
    color: 'white',
    alignSelf: 'center',
  },
  link: {
    textDecorationLine: 'underline',
  },
  slideHeading: {
    fontSize: vh * 4,
    color: 'white',
    marginBottom: vh * 2,
  },
  description: {
    flexDirection: 'row',
  },
  formIcon: {
    height: vh * 3,
    width: vh * 3,
    tintColor: 'white',
    resizeMode: 'contain',
  },
  formText: {
    color: 'white',
    fontSize: vh * 2.2,
    marginLeft: vw * 2,
    width: '80%',
  },
  dotStyle: {
    width: vw * 2,
    height: vh * 1.2,
    backgroundColor: '#9B510F',
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: vh * 4,
    width: '100%',
  },
  forgetPass: {
    color: colors.primary,
  },
  storeBtn: {
    height: vh * 5,
    backgroundColor: colors.secondary,
    borderRadius: vw * 0.7,
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '7%',
  },
  storeBtnContainer: {
    width: vw * 15,
    position: 'absolute',
    // right: '7%',
    left: vw * 35,

    top: vh * 3,
    alignItems: 'center',
  },
  storeIcon: {
    width: vh * 2.5,
    height: vh * 2.5,
    resizeMode: 'contain',
    tintColor: 'white',
  },
});
