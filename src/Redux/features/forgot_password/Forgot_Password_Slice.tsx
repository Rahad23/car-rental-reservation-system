import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TPasswordForgot = {
  email: string;
  password: string;
};

const initialState: TPasswordForgot = {
  email: "",
  password: "",
};

const forgotPasswordSlice = createSlice({
  name: "password_Forgot",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword_: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },

    resetPasswordForgotState() {
      return initialState; // Resets state to initial values
    },
  },
});

export const { setEmail, setPassword_, resetPasswordForgotState } =
  forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
