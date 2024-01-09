import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getMyPrinters} from '../../api/Printers';

const initialState = {
  myPrinter: [],
};

export const updatePrinters = createAsyncThunk(
  'Setup/GetPrinters',
  async data => {
    try {
      const response = await getMyPrinters(data);
      return response;
    } catch (error) {}
  },
);

// create a slice of user
const slice = createSlice({
  name: 'printer',
  initialState,
  reducers: {
    updatePrinterRedux: (state, action) => {
      state.myPrinter = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(updatePrinters.fulfilled, (state, action) => {
      console.log(action.payload, 'payload in api');
      state.myPrinter = action.payload.data;
    });
  },
});
const reducer = slice.reducer;

export default reducer;

export const {updatePrinterRedux} = slice.actions;
