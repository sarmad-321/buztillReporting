import {
  TextInput,
  Image,
  View,
  TouchableOpacity,
  Animated,
  Text,
  Pressable,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {styles} from './styles';
import {icons} from '../../assets';
import {colors} from '../../utils/theme';
import ArialBold from '../TextWrapper/ArialBold';
import {vh} from '../../utils/units';
import DropDownPicker from 'react-native-dropdown-picker';

const DropdownField = props => {
  const [showPassword, setShowPassword] = useState(
    props.secureTextEntry || false,
  );
  const borderAnimation = useRef(new Animated.Value(0)).current;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

  return (
    <View>
      {props.label && <ArialBold>{props.label} : </ArialBold>}
      {/* <DropDownPicker
        open={open}
        value={value}
        items={props.values}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      /> */}

      <Animated.View
        style={[
          styles.container,
          {
            borderColor: borderAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [colors.inputBorders, colors.primary], // 0 : 150, 0.5 : 75, 1 : 0
            }),
          },
          props.style,
        ]}>
        <TouchableOpacity
          onPress={props?.onDropdownPress ? props.onDropdownPress : () => {}}
          style={styles.textContainer}>
          {props.icon && (
            <View style={styles.iconContainer}>
              <Image source={props.icon} style={styles.rightIcon} />
            </View>
          )}
          <Text style={{color: props.value ? 'black' : '#c1c1c1'}}>
            {props.value || props.placeholder}
          </Text>
        </TouchableOpacity>

        <Image
          source={icons.dropdown}
          style={{
            width: vh * 1.5,
            height: vh * 1.5,
            resizeMode: 'contain',
            tintColor: 'gray',
          }}
        />

        {props.secureTextEntry && (
          <TouchableOpacity
            onPress={() => {
              setShowPassword(!showPassword);
            }}
            style={styles.rightContainer}>
            <Animated.Image
              source={!showPassword ? icons.eyeOpen : icons.eyeClose}
              style={[
                styles.rightIcon,
                {
                  tintColor: borderAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [colors.inputBorders, colors.primary], // 0 : 150, 0.5 : 75, 1 : 0
                  }),
                },
              ]}
            />
          </TouchableOpacity>
        )}
      </Animated.View>
      {props.error && <Text style={styles.error}>{props?.error}</Text>}
    </View>
  );
};

export default DropdownField;
