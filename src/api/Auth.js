import instance from '.';
import {endpoints} from './config';

const verifyRegistration = async data => {
  return instance.post(endpoints.validateRegistration, data);
};

const login = async (data, headers) => {
  return instance.post(endpoints.login, data, {
    headers: headers,
  });
};
const forgetPassEmail = async (data, headers) => {
  return instance.get(endpoints.forgetPass + '/' + data.loginName, {
    headers: headers,
  });
};

const getMenusService = data => {
  return instance.get(endpoints.getMenus + data);
};

export {verifyRegistration, login, forgetPassEmail, getMenusService};
