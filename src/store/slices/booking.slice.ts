import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppPayload } from "../../models/application/payload";
import { Booking, BookingData } from "../../models/client/response";
import { BookingState } from "../../models/application/state";

const initialState: BookingState = {
  showForm: false,
  showModal: false,
  page: 1,
  size: 10,
  action: "NONE",
  record: new Booking(),
  request: [],
  bookings: new Booking(),
  response: new BookingData(),
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingState: <K extends keyof BookingState>(
      state: BookingState,
      action: PayloadAction<AppPayload<BookingState, K>>
    ) => {
      const { value, key } = action.payload;
      state[key] = value;
    },
    setAllBookingState: (state, action: PayloadAction<BookingState>) => {
      state = action.payload as BookingState;
      return state;
    },
  },
});

export const { setAllBookingState, setBookingState } = bookingSlice.actions;
export const bookingReducer = bookingSlice.reducer;
