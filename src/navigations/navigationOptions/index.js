import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import ArialBold from '../../components/TextWrapper/ArialBold';
import InterMedium from '../../components/TextWrapper/InterMedium';
import {icons, images} from '../../assets';
import SelectDropDown from '../../components/Dropdown';
import {useRef, useState} from 'react';
import LanguageDropDown from '../../components/Dropdown/LanguageDropDown';
import i18n from 'i18next';
import {useTranslation} from 'react-i18next';
import {changeLanguageReducer} from '../../store/slices/generalSlice';
import SwitchUserDropdown from '../../components/Dropdown/SwitchUserDropdown';
import {logout} from '../../store/slices/userSlice';
import SwitchUserPopup from '../../components/popups/SwitchUserPopup';

const titles = {
  MenuScreen: 'Home',
  PrinterScreen: 'Printer',
};

const getTitle = props => {
  if (titles[props?.route?.name]) {
    return titles[props?.route?.name];
  }
  return '';
};

const NavigationOptions = props => {
  const menuName = useSelector(state => state.general.currentMenu);
  const menuInfo = useSelector(state => state.general.menuInfo);
  const currentLanguage = useSelector(state => state.general.currentLanguage);
  // const [currentLanguage, setCurrentLanguage] = useState('English');
  const Languages = [
    {
      label: 'English',
      value: 'en',
      flag: require('../../assets/icons/america.png'),
    },
    {
      label: 'Maltese',
      value: 'mt',
      flag: require('../../assets/icons/malta.png'),
    },
  ];
  const [localCurrentLanguage, setLocalCurrentLaguage] = useState(Languages[0]);

  const languageDD = useRef();
  const switchDD = useRef();
  const switchPopup = useRef();

  const dispatch = useDispatch();
  const {t} = useTranslation();

  const user = useSelector(state => state.user.loginDetails);

  const handleChangeLanguage = item => {
    i18n.changeLanguage(item.value);
    // setCurrentLanguage(item.label);
    setLocalCurrentLaguage(item);
    dispatch(changeLanguageReducer(item));
  };

  const handleChangeUser = item => {
    switch (item.value) {
      case 'logout':
        dispatch(logout());
        break;
      case 'switch':
        switchPopup.current.show();
        break;
      default:
        break;
    }
  };

  return {
    headerShown: true,
    headerShadowVisible: false,
    title: t(menuName),
    headerRight: () => {
      return (
        <View style={styles.infoContainer}>
          <TouchableOpacity
            onPress={() => languageDD.current.show()}
            style={styles.languageContainer}>
            <Image source={currentLanguage.flag} style={styles.flag} />
            <Image source={icons.dropdown} style={styles.icon} />
          </TouchableOpacity>
          {/* <View>
            <ArialBold>{menuInfo?.userName}</ArialBold>
            <View style={styles.roleContainer}>
              <Text style={styles.text}>{menuInfo?.roleName}</Text>
            </View>
          </View> */}
          {/* <TouchableOpacity
            onPress={() => switchDD.current.show()}
            style={styles.profileContainer}>
            <Image
              style={styles.profile}
              source={
                user?.profileImageURL
                  ? images.dummyProfile
                  : // {uri: user.profileImageURL}
                    images.dummyProfile
              }
            />
          </TouchableOpacity> */}
          <LanguageDropDown
            reference={languageDD}
            values={Languages}
            onChangeValue={handleChangeLanguage}
          />
          <SwitchUserDropdown
            reference={switchDD}
            values={Languages}
            onChangeValue={handleChangeUser}
          />
          <SwitchUserPopup reference={switchPopup} />
        </View>
      );
    },
  };
};

export default NavigationOptions;
