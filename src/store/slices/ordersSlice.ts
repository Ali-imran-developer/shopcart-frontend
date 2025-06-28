import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  orderData: any;
  dashboardData: any;
  bookedOrdersData: any
  isDataLoaded: boolean;
};

const initialState: initialStateType = {
  orderData: null,
  dashboardData: null,
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
    setDashboardData:(state, action: PayloadAction<any>) => {
      state.dashboardData = action.payload;
    }, 
  },
});

export const { setOrders, setBookedOrders, setDashboardData } = OrderSlice.actions;
export default OrderSlice.reducer;