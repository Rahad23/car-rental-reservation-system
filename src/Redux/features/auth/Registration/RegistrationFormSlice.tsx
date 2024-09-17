import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TOpenForm = {
  isOpen: boolean;
};

const initialState: TOpenForm = {
  isOpen: false,
};

const registrationFormOpenSlice = createSlice({
  name: "registration_form_open",
  initialState,
  reducers: {
    setIsRegOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    resetIsRegOpenState: () => {
      return initialState; // Resets state to initial values
    },
  },
});

export const { setIsRegOpen } = registrationFormOpenSlice.actions;

export default registrationFormOpenSlice.reducer;
