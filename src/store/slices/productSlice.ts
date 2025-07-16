import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  data: any;
  isDataLoaded: boolean;
};

const initialState: initialStateType = {
  data: null,
  isDataLoaded: false,
};

export const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.isDataLoaded = true;
    },
  },
});

export const { setProducts } = ProductSlice.actions;
export default ProductSlice.reducer;