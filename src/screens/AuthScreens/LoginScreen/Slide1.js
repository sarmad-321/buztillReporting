import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import ArialBold from '../../../components/TextWrapper/ArialBold';
import InterMedium from '../../../components/TextWrapper/InterMedium';
import {icons, images} from '../../../assets';

const Slide1 = () => {
  return (
    <View style={styles.slide}>
      <View>
        <Image source={images.barcode} style={styles.image} />
        <ArialBold style={styles.subHeading}>
          New in BUZZTILL <Text style={styles.link}>Click Here</Text>
        </ArialBold>
      </View>
      <View style={{marginBottom: '5%'}}>
        <ArialBold style={styles.slideHeading}>
          Omni channel retail by BUZZTILL
        </ArialBold>
        <View style={styles.description}>
          <Image source={icons.rightArrow} style={styles.formIcon} />
          <InterMedium style={styles.formText}>
            BUZZTILL's free barcode scanner app lets you check what's in stock
            and count inventory from your iPhone.
          </InterMedium>
        </View>
      </View>
    </View>
  );
};

export default Slide1;
