import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  storeData: any;
  isDataLoaded: boolean;
};

const initialState: initialStateType = {
  storeData: null,
  isDataLoaded: false,
};

export const StoreSlice = createSlice({
  name: "StoreSlice",
  initialState,
  reducers: {
    setStore: (state, action: PayloadAction<any>) => {
      state.storeData = action.payload;
      state.isDataLoaded = true;
    },
  },
});

export const { setStore } = StoreSlice.actions;
export default StoreSlice.reducer;