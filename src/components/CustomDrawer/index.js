import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {colors} from '../../utils/theme';
import {vh, vw} from '../../utils/units';
import ArialBold from '../TextWrapper/ArialBold';
import Accordion from 'react-native-collapsible/Accordion';
import {icons, images} from '../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../store/slices/userSlice';
import {EventRegister} from 'react-native-event-listeners';

import {useNavigation} from '@react-navigation/native';
import {getMenusService} from '../../api/Auth';
import MainButton from '../MainButton';
import {onMenuChange, saveUserInfo} from '../../store/slices/generalSlice';
import {POS_APP_TYPES} from '../../utils/constants';
import Divider from '../Divider';

const iconsforDrawer = {
  Dashboard: icons.menuTiles,
  'Retail Dashboard': icons.retail,
  'Sales Reports': icons.salesReports,
  'Inventory Reports': icons.inventory,
  'Payment Reports': icons.paymentReports,
  'Register Closures': icons.registers,
  'Store Credit Reports': icons.storeCredits,
  'Tax Reports': icons.taxReport,
  'Other Reports': icons.taxReport,
};

const CustomDrawer = ({navigation}) => {
  const user = useSelector(state => state.user);
  const [menu, setMenu] = useState([]);
  const dispatch = useDispatch();
  const menuInfo = useSelector(state => state.general.menuInfo);

  useEffect(() => {
    getMenus();
  }, [user]);
  const getMenus = () => {
    const transformedData = [];

    getMenusService(POS_APP_TYPES.REPORTING)
      .then(res => {
        let data = res.data.menus;
        let storeInfo = res.data.storeInfo;
        dispatch(saveUserInfo(storeInfo));
        console.log(data, 'menu');
        const dataMap = [];
        // data.forEach(item => {
        //   const {menuNavigationID, displayText, menuURL} = item;
        //   dataMap.set(menuNavigationID, {
        //     name: displayText,
        //     url: menuURL,
        //     innerMenu: [],
        //   });
        // });

        // Iterate over the data and add innerMenu names to their parent
        data.forEach(item => {
          let newObject = {
            name: item.displayText,
            url: item.menuURL,
          };
          dataMap.push(newObject);
        });
        console.log(dataMap, 'dataMap');
        setMenu(dataMap);
      })
      .catch(res => {
        if (res.status == 401) {
          dispatch(logout());
        }
        console.log(res, 'response of catch');
      });
  };

  useEffect(() => {
    if (!user.loginDetails) {
      handleLogoutPress();
    }
  }, [user]);

  const handleLogoutPress = () => {
    dispatch(logout());
    navigation.closeDrawer();
    navigation.replace('AuthNavigator', {
      screen: 'LoginScreen',
    });
  };

  const handleMenuPress = async item => {
    dispatch(onMenuChange(item.name));
    navigation.closeDrawer();
    console.log(item);
    setTimeout(() => {}, 500);
    if (item.name == 'Printers') {
      navigation.navigate('PrinterStack');
    } else {
      await navigation.navigate('MenuScreen');
      EventRegister.emit('drawerPressEvent', item);
    }
  };

  const RenderHeader = ({section}) => {
    return (
      <TouchableOpacity
        onPress={() => handleMenuPress(section)}
        key={section.name}
        style={styles.btnContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={iconsforDrawer[section.name]} style={[styles.icon]} />
          <ArialBold style={styles.innerText}>{section.name}</ArialBold>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Image source={images.appLogoV1} style={styles.logo} />
      <View style={styles.profileBoxContainer}>
        <TouchableOpacity style={styles.profileContainer}>
          <Image
            style={styles.profile}
            source={
              user?.profileImageURL ? images.dummyProfile : images.dummyProfile
            }
          />
        </TouchableOpacity>
        <View>
          <ArialBold style={{color: 'white'}}>
            Hello {menuInfo?.userName}
          </ArialBold>
          <Text style={styles.text}>{menuInfo?.roleName}</Text>
          {/* <View style={styles.roleContainer}>
          </View> */}
        </View>
      </View>
      <Divider />

      {menu.map(item => {
        return <RenderHeader section={item} />;
      })}
      <Divider />
      <TouchableOpacity
        onPress={handleLogoutPress}
        style={[styles.btnContainer]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={icons.logout} style={[styles.icon]} />
          <ArialBold style={styles.innerText}>Logout</ArialBold>
        </View>
      </TouchableOpacity>
      {/* <View style={styles.profileBoxContainer}>
        <TouchableOpacity style={styles.profileContainer}>
          <Image
            style={styles.profile}
            source={
              user?.profileImageURL ? images.dummyProfile : images.dummyProfile
            }
          />
        </TouchableOpacity>
        <View>
          <ArialBold style={{color: 'white'}}>{menuInfo?.userName}</ArialBold>
          <Text style={styles.text}>{menuInfo?.roleName}</Text>
    
        </View>
      </View> */}
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  profileBoxContainer: {
    flexDirection: 'row',
    height: 60,
    width: '70%',
    // position: 'absolute',
    // backgroundColor: colors.transparentShade,
    bottom: 0,
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // paddingHorizontal: '15%',
  },
  container: {
    backgroundColor: colors.secondary,
    flex: 1,
    // height: vh * 100,
    paddingTop: vh * 5,
  },
  profileContainer: {
    height: 40,
    width: 40,
    borderRadius: vh * 100,
    overflow: 'hidden',
    marginRight: 15,
  },
  profile: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: colors.primary,
    position: 'absolute',
    bottom: 0,
  },
  btnContainer: {
    width: '65%',
    height: 35,
    alignSelf: 'center',
    borderRadius: 4,
    marginVertical: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
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
    color: '#8190a3',
    fontSize: 14,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.drawerIcons,
    marginRight: 15,
  },
  dropdown: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  list: {
    backgroundColor: colors.transparentShade,
    paddingHorizontal: '22%',
    justifyContent: 'center',
    height: 40,
  },
  innerText: {
    color: 'white',
    fontSize: 14,
  },
  registerText: {
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    width: '50%',
    alignSelf: 'center',
  },
});
