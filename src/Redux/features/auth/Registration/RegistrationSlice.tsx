import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TRegister = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
};

const initialState: TRegister = {
  name: "",
  email: "",
  password: "",
  phone: "",
  address: "",
};

const registerSlice = createSlice({
  name: "register_user",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    resetRegistrationState: () => {
      return initialState; // Resets state to initial values
    },
  },
});

export const {
  setName,
  setEmail,
  setAddress,
  setPassword,
  setPhoneNumber,
  resetRegistrationState,
} = registerSlice.actions;

export default registerSlice.reducer;
