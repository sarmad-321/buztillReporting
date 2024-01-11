import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/theme';
import {vh, vw} from '../../../utils/units';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    flexDirection: 'row',
  },
  formContainer: {
    // width: '50%',
    flex: 1,
    justifyContent: 'center',
    // height: '100%',
    paddingHorizontal: 20,
  },
  swiperContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.primary,
  },
  innerForm: {
    paddingHorizontal: '3%',
    // backgroundColor: 'green',
    // marginTop: vh * 5,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  slide: {
    // height: vh * 100,
    flex: 1,
    paddingHorizontal: '5%',
    justifyContent: 'space-around',
  },
  image: {
    width: 300,
    height: 300,
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
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  description: {
    flexDirection: 'row',
  },
  formIcon: {
    height: 15,
    width: 15,
    tintColor: 'white',
    resizeMode: 'contain',
  },
  formText: {
    color: 'white',
    fontSize: 18,
    marginLeft: '2%',
    width: '80%',
  },
  dotStyle: {
    width: 30,
    height: 8,
    backgroundColor: '#9B510F',
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 35,
    width: '100%',
  },
  forgetPass: {
    color: colors.primary,
  },
  storeBtn: {
    height: 35,

    backgroundColor: colors.secondary,
    borderRadius: 10,
    // width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '7%',
  },
  storeBtnContainer: {
    width: 150,
    position: 'absolute',
    // left: vw * 35,
    right: 0,
    zIndex: 100,
    top: 20,
    alignItems: 'center',
  },
  storeIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
    resizeMode: 'contain',
    tintColor: 'white',
  },
});
