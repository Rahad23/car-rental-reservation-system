import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TCar = {
  name: string;
  description: string;
  category: string;
  color: string;
  isElectric: boolean; // Boolean type
  features: string[]; // Array of strings
  pricePerHour: string;
};

const initialState: TCar = {
  name: "",
  description: "",
  category: "",
  color: "",
  isElectric: false,
  features: [],
  pricePerHour: "",
};

const carCreateSlice = createSlice({
  name: "make-car",
  initialState,
  reducers: {
    setCarName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setCarDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setCarCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setCarColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    setIsElectric: (state, action: PayloadAction<boolean>) => {
      state.isElectric = action.payload;
    },
    setCarFeatures: (state, action: PayloadAction<string[]>) => {
      state.features = [];
      action.payload.forEach((feature) => {
        //always push unique feature name
        if (!state.features.includes(feature)) {
          state.features.push(feature);
        }
      });
    },
    setPricePerHour: (state, action: PayloadAction<string>) => {
      state.pricePerHour = action.payload;
    },
    resetCarDataState() {
      return initialState; // Resets state to initial values
    },
  },
});

export const {
  setCarName,
  setCarDescription,
  setCarCategory,
  setCarColor,
  setCarFeatures,
  setIsElectric,
  setPricePerHour,
  resetCarDataState,
} = carCreateSlice.actions;

export default carCreateSlice.reducer;
