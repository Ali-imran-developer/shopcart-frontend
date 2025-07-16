import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  resellerData: any;
  allResellerData: any;
};

const initialState: initialStateType = {
  resellerData: null,
  allResellerData: null,
};

export const ResaleSlice = createSlice({
  name: "ResaleSlice",
  initialState,
  reducers: {
    setResaleProducts: (state, action: PayloadAction<any>) => {
      state.resellerData = action.payload;
    },
    setAllResaleProducts: (state, action: PayloadAction<any>) => {
      state.allResellerData = action.payload;
    },
  },
});

export const { setResaleProducts, setAllResaleProducts } = ResaleSlice.actions;
export default ResaleSlice.reducer;