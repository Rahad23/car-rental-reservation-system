import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TDarkLightType = {
  darkLight: boolean;
};

const initialState: TDarkLightType = {
  darkLight: false
};

const darkLightSlice = createSlice({
  name: "darkLight",
  initialState,
  reducers: {
    setDarkLight: (state, action: PayloadAction<boolean>) => {
      // Reset carFeatures array
      state.darkLight = action.payload;

    },

    resetDarkLightState() {
      return initialState; // Resets state to initial values
    },
  },
});
export const { setDarkLight, resetDarkLightState } =
darkLightSlice.actions;

export default darkLightSlice.reducer;
