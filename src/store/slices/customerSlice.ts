import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  customerData: any;
  isDataLoaded: boolean;
};

const initialState: initialStateType = {
  customerData: null,
  isDataLoaded: false,
};

export const CustomerSlice = createSlice({
  name: "CustomerSlice",
  initialState,
  reducers: {
    setCustomer: (state, action: PayloadAction<any>) => {
      state.customerData = action.payload;
      state.isDataLoaded = true;
    },
  },
});

export const { setCustomer } = CustomerSlice.actions;
export default CustomerSlice.reducer;