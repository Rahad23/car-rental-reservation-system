import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TOpenForm = {
  isOpen: boolean;
};

const initialState: TOpenForm = {
  isOpen: false,
};

const loginFormOpenSlice = createSlice({
  name: "login_form_open",
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    resetIsOpenState: () => {
      return initialState; // Resets state to initial values
    },
  },
});

export const { setIsOpen } = loginFormOpenSlice.actions;

export default loginFormOpenSlice.reducer;
