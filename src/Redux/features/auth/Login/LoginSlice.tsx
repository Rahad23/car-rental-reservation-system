import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TLogin = {
  email: string;
  password: string;
};

const initialState: TLogin = {
  email: "",
  password: "",
};

const loginSlice = createSlice({
  name: "login_user",
  initialState,
  reducers: {
    setLoginEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setLoginPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },

    resetLoginState: () => {
      return initialState; // Resets state to initial values
    },
  },
});

export const { setLoginEmail, setLoginPassword, resetLoginState } =
  loginSlice.actions;

export default loginSlice.reducer;
