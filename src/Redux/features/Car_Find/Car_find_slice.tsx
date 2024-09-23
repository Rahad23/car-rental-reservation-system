import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TCarFindDataType = {
  carType: string[];
  carFeatures: string[];
};

const initialState: TCarFindDataType = {
  carType: [],
  carFeatures: [],
};

const carFindSlice = createSlice({
  name: "car-find",
  initialState,
  reducers: {
    setCarFeatures: (state, action: PayloadAction<string[]>) => {
      // Reset carFeatures array
      state.carFeatures = [];

      // Add unique features to carFeatures
      action.payload.forEach((feature) => {
        //always push unique feature name
        if (!state.carType.includes(feature)) {
          state.carFeatures.push(feature);
        }
      });
    },
    setCarTypes: (state, action: PayloadAction<string[]>) => {
      state.carType = [];
      action.payload.forEach((type) => {
        //always push unique feature name
        if (!state.carType.includes(type)) {
          state.carType.push(type);
        }
      });
    },
    resetCarFindDataState() {
      return initialState; // Resets state to initial values
    },
  },
});
export const { setCarFeatures, setCarTypes, resetCarFindDataState } =
  carFindSlice.actions;

export default carFindSlice.reducer;
