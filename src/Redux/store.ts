import { configureStore } from "@reduxjs/toolkit";

import register_userReducer from "./features/auth/Registration/RegistrationSlice";
import loginFormOpenReducer from "./features/auth/Login/LoginFormSlice";
import registrationFormOpenReducer from "./features/auth/Registration/RegistrationFormSlice";
import makeCarReducer from "./features/Cars/CarSlice";
import loginReducer from "./features/auth/Login/LoginSlice";
import { baseApi } from "./api/baseApi";
import authReducer from "./features/auth/Auth/AuthSlice";
import bookingReducer from "./features/Booking/BookinasSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    registration: register_userReducer,
    loginFormOpen: loginFormOpenReducer,
    registrationFormOpen: registrationFormOpenReducer,
    loginUser: loginReducer,
    makeACar: makeCarReducer,
    auth: persistedAuthReducer,
    booking: bookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
