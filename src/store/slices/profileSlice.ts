import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  data: any;
  isDataLoaded: boolean;
};

const initialState: initialStateType = {
  data: null,
  isDataLoaded: false,
};

export const ProfileSlice = createSlice({
  name: "ProfileSlice",
  initialState,
  reducers: {
    setProfileList: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.isDataLoaded = true;
    },
  },
});

export const { setProfileList } = ProfileSlice.actions;
export default ProfileSlice.reducer;