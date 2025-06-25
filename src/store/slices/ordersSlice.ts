import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  orderData: any;
  bookedOrdersData: any
  isDataLoaded: boolean;
};

const initialState: initialStateType = {
  orderData: null,
  bookedOrdersData: null,
  isDataLoaded: false,
};

export const OrderSlice = createSlice({
  name: "OrderSlice",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<any>) => {
      state.orderData = action.payload;
      state.isDataLoaded = true;
    },
    setBookedOrders: (state, action: PayloadAction<any>) => {
      state.bookedOrdersData = action.payload;
    },
  },
});

export const { setOrders, setBookedOrders } = OrderSlice.actions;
export default OrderSlice.reducer;