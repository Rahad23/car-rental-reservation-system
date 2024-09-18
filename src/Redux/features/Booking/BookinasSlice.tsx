import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TBooking = {
  carId: string;
  date: string;
  startTime: string;
};

const initialState: TBooking = {
  carId: "",
  date: "",
  startTime: "",
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

    resetBookingDataState() {
      return initialState; // Resets state to initial values
    },
  },
});

export const { setCarId, setDate, setStartTime, resetBookingDataState } =
  carBookingSlice.actions;

export default carBookingSlice.reducer;
