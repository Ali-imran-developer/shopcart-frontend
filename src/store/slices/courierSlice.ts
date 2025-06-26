import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  courierData: any;
  courierCreds: any;
  isDataLoaded: boolean;
};

const initialState: initialStateType = {
  courierData: null,
  courierCreds: null,
  isDataLoaded: false,
};

export const courierSlice = createSlice({
  name: "courierSlice",
  initialState,
  reducers: {
    setCourier: (state, action: PayloadAction<any>) => {
      state.courierData = action.payload;
      state.isDataLoaded = true;
    },
    setCourierCreds: (state, action: PayloadAction<any>) => {
      state.courierCreds = action.payload;
      state.isDataLoaded = true;
    },
  },
});

export const { setCourier, setCourierCreds } = courierSlice.actions;
export default courierSlice.reducer;