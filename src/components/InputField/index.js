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

const InputField = props => {
  const [showPassword, setShowPassword] = useState(
    props.secureTextEntry || false,
  );
  const inputRef = useRef();
  const borderAnimation = useRef(new Animated.Value(0)).current;

  const tintColorAnimation = () => {
    Animated.timing(borderAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const tintOut = () => {
    Animated.timing(borderAnimation, {
      toValue: 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
  };
  const handleInputPress = () => {
    if (props.reference) {
      props.reference.current.focus();
    } else {
      inputRef.current.focus();
    }
  };
  return (
    <View style={{}}>
      {props.label && <ArialBold>{props.label} : </ArialBold>}
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
        <Pressable onPress={handleInputPress} style={styles.textContainer}>
          {props.icon && (
            <View style={styles.iconContainer}>
              <Image source={props.icon} style={styles.rightIcon} />
            </View>
          )}
          <TextInput
            onFocus={() => {
              tintColorAnimation();
            }}
            onBlur={() => {
              tintOut();
            }}
            ref={props?.reference ? props?.reference : inputRef}
            style={styles.input}
            placeholderTextColor={'#c1c1c1'}
            {...props}
            secureTextEntry={showPassword}
          />
        </Pressable>

        {props.rightText && (
          <View style={styles.subText}>
            <Text>{props.rightText}</Text>
          </View>
        )}

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

export default InputField;
