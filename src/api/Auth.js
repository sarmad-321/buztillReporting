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

const getMenusService = (data, lang) => {
  return instance.get(endpoints.getMenus + data, {
    headers: {
      'X-LANG': lang?.value == 'mt' ? '2' : '1',
    },
  });
};

export {verifyRegistration, login, forgetPassEmail, getMenusService};
