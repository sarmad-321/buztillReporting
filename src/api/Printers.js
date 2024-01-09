import instance from '.';
import {endpoints} from './config';

const getMyPrinters = async data => {
  return instance.post(endpoints.getPrinters, data);
};

const addUpdatePrinter = async data => {
  return instance.post(endpoints.postPrinter, data);
};

export {getMyPrinters, addUpdatePrinter};
