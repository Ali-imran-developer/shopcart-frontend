import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  orderData: {
    orders: any[];
    totalOrders: number;
  };
  paymentData?: any;
  dashboardData: any;
  bookedOrdersData: any
  isDataLoaded: boolean;
};

const initialState: initialStateType = {
  orderData: { orders: [], totalOrders: 0 },
  dashboardData: null,
  paymentData: null,
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
    setPaymentData:(state, action: PayloadAction<any>) => {
      state.paymentData = action.payload;
    },
  },
});

export const { setOrders, setBookedOrders, setDashboardData, setPaymentData } = OrderSlice.actions;
export default OrderSlice.reducer;