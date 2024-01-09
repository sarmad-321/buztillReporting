import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {forgetPassEmail, login, verifyRegistration} from '../../api/Auth';

const initialState = {
  user: null,
  token: null,
  store: null,
  loginDetails: null,
  register: null,
  outlet: null,
};

export const VerifyStoreRegistration = createAsyncThunk(
  'user/verifyRegistration',
  async data => {
    try {
      const response = await verifyRegistration(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);

export const userLogin = createAsyncThunk('user/login', async data => {
  try {
    const response = await login(data.apiData, data.headers);
    return response;
  } catch (error) {}
});

export const userForgotPass = createAsyncThunk(
  'user/forgetPass',
  async data => {
    try {
      const response = await forgetPassEmail(data.apiData, data.headers);
      return response;
    } catch (error) {}
  },
);

// create a slice of user
const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
      state.loginDetails = null;
      state.register = null;
      state.outlet = null;
    },
    storeData: (state, action) => {
      state.store = action.payload;
    },
    saveLoginDetails: (state, action) => {
      state.loginDetails = action.payload;
      state.token = action.payload.token;
    },
    saveRegister: (state, action) => {
      state.register = action.payload;
    },
    saveOutlet: (state, action) => {
      state.outlet = action.payload;
    },
  },
});
const reducer = user.reducer;

export default reducer;

export const {logout, storeData, saveLoginDetails, saveRegister, saveOutlet} =
  user.actions;
export const selectUserProfile = state => state.user.user;
export const selectBearerToken = state => state.user.token;
export const selectStore = state => state.user.store;
