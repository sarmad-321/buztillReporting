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

const iconsforDrawer = {
  Sell: icons.cart,
  Setup: icons.settings,
};

const RenderHeader = ({section, _, isActive}) => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  const rotateDown = () => {
    Animated.timing(rotateValue, {
      toValue: 90,
      duration: 300, // Adjust the duration as needed
      easing: Easing.linear, // Adjust the easing function as needed
      useNativeDriver: false,
    }).start();
  };

  const rotateUp = () => {
    Animated.timing(rotateValue, {
      toValue: 0,
      duration: 300, // Adjust the duration as needed
      easing: Easing.linear, // Adjust the easing function as needed
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (isActive) {
      rotateDown();
    } else {
      rotateUp();
    }
  }, [isActive]);
  return (
    <View key={section.name} style={styles.btnContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={iconsforDrawer[section.name]}
          style={[styles.icon, {marginRight: vw * 1}]}
        />
        <ArialBold style={{color: 'white'}}>{section.name}</ArialBold>
      </View>
      <Animated.Image
        source={icons.rightArrow}
        style={[
          styles.dropdown,
          {
            transform: [
              {
                rotate: rotateValue.interpolate({
                  inputRange: [0, 90],
                  outputRange: ['0deg', '90deg'],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

const CustomDrawer = ({navigation}) => {
  const [activeSection, setActiveSection] = useState([]);
  const user = useSelector(state => state.user);
  const [menu, setMenu] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getMenus();
  }, [user]);
  const getMenus = () => {
    const transformedData = [];

    getMenusService(1)
      .then(res => {
        let data = res.data.menus;
        let storeInfo = res.data.storeInfo;
        dispatch(saveUserInfo(storeInfo));

        const dataMap = new Map();
        data.forEach(item => {
          const {menuNavigationID, displayText, menuURL} = item;
          dataMap.set(menuNavigationID, {
            name: displayText,
            url: menuURL,
            // innerMenu: displayText == 'Setup' ? [{name: 'Printers'}] : [],
            innerMenu: [],
          });
        });

        // Iterate over the data and add innerMenu names to their parent
        data.forEach(item => {
          const {parentMenuNavigationID} = item;
          if (parentMenuNavigationID !== 0) {
            const parentItem = dataMap.get(parentMenuNavigationID);
            if (parentItem) {
              let newObject = {
                name: item.displayText,
                url: item.menuURL,
              };
              parentItem.innerMenu.push(newObject);
            }
          } else {
            transformedData.push(dataMap.get(item.menuNavigationID));
          }
        });
        setMenu(transformedData);
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
    setActiveSection([]);
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

  const handleRegisterPress = () => {
    navigation.closeDrawer();
    EventRegister.emit('register');
  };

  const renderContent = section => (
    <View>
      {section?.innerMenu.map(item => {
        return (
          <TouchableOpacity
            onPress={() => handleMenuPress(item)}
            key={item.name}
            style={styles.list}>
            <ArialBold style={styles.innerText}>{item.name}</ArialBold>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={images.appLogoV1} style={styles.logo} />
      <ArialBold style={styles.registerText}>{user.outlet?.outlet}</ArialBold>
      <ArialBold style={styles.registerText}>
        {user.register?.register}
      </ArialBold>
      <MainButton
        onPress={handleRegisterPress}
        title="Select Register"
        style={styles.button}
      />
      <Accordion
        sections={menu}
        renderHeader={(section, _, isActive) => (
          <RenderHeader section={section} isActive={isActive} />
        )}
        renderContent={renderContent}
        activeSections={activeSection}
        onChange={item => setActiveSection(item)}
      />
      <TouchableOpacity
        onPress={handleLogoutPress}
        style={[styles.btnContainer]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={icons.logout}
            style={[styles.icon, {marginRight: vw * 1}]}
          />
          <ArialBold style={{color: 'white'}}>Logout</ArialBold>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    height: vh * 100,
    paddingTop: vh * 5,
  },
  logo: {
    width: vh * 8,
    height: vh * 8,
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: colors.primary,
  },
  btnContainer: {
    width: '65%',
    height: vh * 5,
    alignSelf: 'center',
    borderRadius: 4,
    marginVertical: vh * 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: vw * 1,
  },
  icon: {
    width: vh * 2,
    height: vh * 2,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  dropdown: {
    width: vh * 1.5,
    height: vh * 1.5,
    resizeMode: 'contain',
  },
  list: {
    backgroundColor: colors.transparentShade,
    paddingHorizontal: '22%',
    justifyContent: 'center',
    height: vh * 5,
  },
  innerText: {
    color: 'white',
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
