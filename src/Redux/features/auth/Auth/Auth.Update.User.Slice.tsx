import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TRegister = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

const initialState: TRegister = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const updateUser = createSlice({
  name: "update_profile",
  initialState,
  reducers: {
    setUpdateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setUpdateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUpdateAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setUpdatePhoneNumber: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    resetUpdateUserState: () => {
      return initialState; // Resets state to initial values
    },
  },
});

export const {
  setUpdateName,
  setUpdateEmail,
  setUpdateAddress,
  setUpdatePhoneNumber,
  resetUpdateUserState,
} = updateUser.actions;

export default updateUser.reducer;
