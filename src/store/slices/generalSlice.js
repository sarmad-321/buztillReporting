import {createSlice} from '@reduxjs/toolkit';
import {icons} from '../../assets';

const initialState = {
  btnLoader: false,
  generalLoader: false,
  menuInfo: null,
  multipleUsers: [],
  savedUser: {
    email: '',
    password: '',
  },
  rememberMe: false,
  currentLanguage: {label: 'English', value: 'en', flag: icons.americanFlag},
  currentMenu: 'Sell',
};

// create a slice of user
const slice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    toggleBtnLoader: (state, action) => {
      state.btnLoader = action.payload;
    },
    toggleGeneralLoader: (state, action) => {
      state.generalLoader = action.payload;
    },
    onMenuChange: (state, action) => {
      state.currentMenu = action.payload;
    },
    saveUserInfo: (state, action) => {
      state.menuInfo = action.payload;
    },
    changeLanguageReducer: (state, action) => {
      state.currentLanguage = action.payload;
    },
    toggleRememberMe: (state, action) => {
      state.rememberMe = action.payload.remember;
      if (action.payload.remember) {
        state.savedUser = action.payload;
      } else {
        state.savedUser = {email: '', password: ''};
      }
    },
    addMultipleUsers: (state, action) => {
      let payload = action.payload;
      let alreadyExist = state.multipleUsers.find(
        item => item.loginName == payload.loginName,
      );
      if (!alreadyExist) {
        state.multipleUsers.push(payload);
      }
    },
  },
});
const reducer = slice.reducer;

export default reducer;

export const {
  toggleBtnLoader,
  toggleGeneralLoader,
  onMenuChange,
  changeLanguageReducer,
  saveUserInfo,
  toggleRememberMe,
  addMultipleUsers,
} = slice.actions;
