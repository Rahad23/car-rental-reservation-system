import { RootState } from "@/Redux/store";
import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  email: string;
  role: string;
  iat: string;
  exp: string;
};

type TState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
    },
    logOutUser: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setUser, logOutUser } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
