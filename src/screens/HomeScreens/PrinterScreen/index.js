import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import MainButton from '../../../components/MainButton';
import {styles} from './styles';
import PrinterPopup from '../../../components/popups/printerPopup';
import usePrinterController from './usePrinterController';
import {icons} from '../../../assets';
import {vh} from '../../../utils/units';
import ArialBold from '../../../components/TextWrapper/ArialBold';
import InterMedium from '../../../components/TextWrapper/InterMedium';
import {colors} from '../../../utils/theme';

const dummyData = [
  {
    name: 'Kitchen Printer',
    ip: '10.20.0.1',
    port: '27015',
    type: 'Wifi',
    isActive: true,
  },
  {
    name: 'Bar Printer',
    ip: '10.20.0.1',
    port: '27015',
    type: 'Wifi',
    isActive: false,
  },
  {
    name: 'Main Printer',
    ip: '10.20.0.1',
    port: '27015',
    type: 'Wifi',
    isActive: false,
  },
  {
    name: 'Test Printer',
    ip: '10.20.0.1',
    port: '27015',
    type: 'Wifi',
    isActive: true,
  },
];
const printerTypes = ['Bluetooth', 'Wifi'];

const PrinterScreen = () => {
  const {printerRef, onAddNewPrinterPress, printers, onEditPress, showAlert} =
    usePrinterController();

  const PrintCard = ({item}) => {
    return (
      <View style={styles.card}>
        <View style={styles.printerContainer}>
          <Image source={icons.printer} style={styles.printerIcon} />
        </View>
        <View style={{justifyContent: 'center', flex: 1}}>
          <TouchableOpacity
            onPress={() => showAlert(item)}
            style={[styles.circle]}>
            <Image
              source={icons.bin}
              style={[styles.icon, {tintColor: 'red'}]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onEditPress(item)}
            style={[styles.circle, {right: '22%'}]}>
            <Image source={icons.edit} style={styles.icon} />
          </TouchableOpacity>
          <ArialBold>
            Name : <InterMedium> {item.name}</InterMedium>
          </ArialBold>
          <ArialBold>
            Type : <InterMedium> {printerTypes[item.type - 1]}</InterMedium>
          </ArialBold>
          <ArialBold>
            IP : <InterMedium> {item.ip} </InterMedium>
          </ArialBold>
          <ArialBold>
            Port : <InterMedium>{item.port}</InterMedium>
          </ArialBold>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ArialBold>
              Status :
              <InterMedium>
                {item.isActive ? 'Active' : 'In Active'}{' '}
              </InterMedium>
            </ArialBold>
            <View
              style={[
                styles.status,
                {backgroundColor: item?.isActive ? colors.green : colors.red},
              ]}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <View style={styles.addBtn}>
        <MainButton onPress={onAddNewPrinterPress} title="Add Printer" />
        <PrinterPopup reference={printerRef} />
      </View>
      <View style={styles.printListContainer}>
        <ArialBold style={styles.h1}>Printer list</ArialBold>

        <FlatList
          numColumns={3}
          contentContainerStyle={{}}
          data={printers}
          renderItem={({item}) => {
            return <PrintCard item={item} />;
          }}
          ListEmptyComponent={() => {
            return (
              <View>
                <InterMedium>
                  You dont have any printer. please add one
                </InterMedium>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default PrinterScreen;
