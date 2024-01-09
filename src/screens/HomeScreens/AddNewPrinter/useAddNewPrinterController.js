import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {addUpdatePrinter} from '../../../api/Printers';
import {useNavigation} from '@react-navigation/native';
import {updatePrinters} from '../../../store/slices/printerSlice';
import {toggleBtnLoader} from '../../../store/slices/generalSlice';

const useAddNewPrinterController = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSave = async (values, isEdit) => {
    let data = {
      Behavior: isEdit ? 3 : 1,
      Name: values.name,
      IP: values.ip,
      Port: values.port,
      IsActive: values.isActive,
      Type: values.type,
      Header: values.header,
      Subtitle1: values.subtitle1,
      Subtitle2: values.subtitle2,
      ShowOutlet: values.showOutlet,
      ShowRegister: values.showRegister,
      ShowDatetime: values.showDatetime,
      ShowServedBy: values.showServedBy,
      ShowPrinterProds: values.showProducts,
      ShowHeader: values.showHeader,
      ShowFooter: values.showFooter,
      IsTabletPrinter: true,
      Footer: values.footer,
    };
    if (isEdit) {
      data['PrinterID'] = isEdit.printerID;
    }
    console.log(data, 'Body in post');
    dispatch(toggleBtnLoader(true));
    const response = await addUpdatePrinter(data);
    dispatch(toggleBtnLoader(false));

    let getUpdatedPrinters = {
      CurrentPageNo: 1,
      PageSize: 15,
      IsTabletPrinter: true,
      showSizeChanger: true,
    };
    dispatch(updatePrinters(getUpdatedPrinters));

    console.log(response, 'response of add update');
    navigation.goBack();
  };

  return {
    handleSave,
  };
};

export default useAddNewPrinterController;
