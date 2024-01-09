import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addUpdatePrinter, getMyPrinters} from '../../../api/Printers';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import {
  updatePrinterRedux,
  updatePrinters,
} from '../../../store/slices/printerSlice';

const usePrinterController = () => {
  // const [printers, setPrinters] = useState([]);
  const printers = useSelector(state => state.printer.myPrinter);
  const printerRef = useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onAddNewPrinterPress = () => {
    // printerRef.current.show();
    navigation.navigate('AddNewPrinter');
  };
  console.log(printers, 'printer list');
  useEffect(() => {
    getPrinters();
  }, []);

  const getPrinters = async () => {
    let data = {
      CurrentPageNo: 1,
      PageSize: 10,
      IsTabletPrinter: true,
      showSizeChanger: true,
    };
    // setPrinters(response.data);
    dispatch(updatePrinters(data));
  };

  const onEditPress = item => {
    navigation.navigate('AddNewPrinter', {printer: item});
  };
  const handleDelete = async item => {
    let data = {
      PrinterID: item.printerID,
      behavior: 2,
    };
    const response = await addUpdatePrinter(data);
    getPrinters();
  };

  const showAlert = item => {
    Alert.alert(
      'Confirmation',
      'Do you want to delete this printer?',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => handleDelete(item),
        },
      ],
      {cancelable: false},
    );
  };

  return {
    printerRef,
    onAddNewPrinterPress,
    printers,
    onEditPress,
    showAlert,
  };
};

export default usePrinterController;
