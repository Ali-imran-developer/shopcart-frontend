import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import orderReducer from "./ordersSlice";
import storeReducer from "./storeSlice";
import courierReducer from "./courierSlice";
import CustomerReducer from "./customerSlice";
import categoriesReducer from "./categoriesSlice";
import profileReducer from "./profileSlice";
import shipperReducer from "./shipperSlice";

const rootReducer = combineReducers({
  Auth: authReducer,
  Products: productReducer,
  Orders: orderReducer,
  Shipper: shipperReducer,
  Profile: profileReducer,
  Stores: storeReducer,
  Categories: categoriesReducer,
  Courier: courierReducer,
  Customer: CustomerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
