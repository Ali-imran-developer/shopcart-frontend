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

export const CourierSlice = createSlice({
  name: "CourierSlice",
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

export const { setCourier, setCourierCreds } = CourierSlice.actions;
export default CourierSlice.reducer;