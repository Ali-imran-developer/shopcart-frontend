import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  data: any;
  publicData: any;
  isDataLoaded: boolean;
};

const initialState: initialStateType = {
  data: null,
  publicData: null,
  isDataLoaded: false,
};

export const CategorySlice = createSlice({
  name: "CategorySlice",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.isDataLoaded = true;
    },
    setPublicCategories: (state, action: PayloadAction<any>) => {
      state.publicData = action.payload;
      state.isDataLoaded = true;
    },
  },
});

export const { setCategories, setPublicCategories } = CategorySlice.actions;
export default CategorySlice.reducer;