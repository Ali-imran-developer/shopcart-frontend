import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  shipperData: any;
  isDataLoaded: boolean;
};

const initialState: initialStateType = {
  shipperData: null,
  isDataLoaded: false,
};

export const ShipperSlice = createSlice({
  name: "ShipperSlice",
  initialState,
  reducers: {
    setShipper: (state, action: PayloadAction<any>) => {
      state.shipperData = action.payload;
      state.isDataLoaded = true;
    },
  },
});

export const { setShipper } = ShipperSlice.actions;
export default ShipperSlice.reducer;