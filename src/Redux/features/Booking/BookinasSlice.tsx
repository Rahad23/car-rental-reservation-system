import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TBooking = {
  carId: string;
  date: string;
  startTime: string;
  driving_license: string;
  pass_nid: string;
};

const initialState: TBooking = {
  carId: "",
  date: "",
  startTime: "",
  driving_license: "",
  pass_nid: "",
};

const carBookingSlice = createSlice({
  name: "booking-car",
  initialState,
  reducers: {
    setCarId: (state, action: PayloadAction<string>) => {
      state.carId = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setStartTime: (state, action: PayloadAction<string>) => {
      state.startTime = action.payload;
    },
    setDrivingLicense: (state, action: PayloadAction<string>) => {
      state.driving_license = action.payload;
    },
    setPass_NID: (state, action: PayloadAction<string>) => {
      state.pass_nid = action.payload;
    },

    resetBookingDataState() {
      return initialState; // Resets state to initial values
    },
  },
});

export const {
  setCarId,
  setDate,
  setStartTime,
  resetBookingDataState,
  setDrivingLicense,
  setPass_NID,
} = carBookingSlice.actions;

export default carBookingSlice.reducer;
