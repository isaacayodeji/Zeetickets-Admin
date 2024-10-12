import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppPayload } from "../../models/application/payload";
import { TicketData, Tickets } from "../../models/client/response";
import { CreateTickets } from "../../models/client/request";
import { Ticket } from "../../models/application/state";

const initialState: Ticket = {
  showForm: false,
  status: "AVAILABLE",
  category: "VIP",
  showModal: false,
  page: 1,
  size: 10,
  action: "NONE",
  record: new Tickets(),
  request: new CreateTickets(),
  tickets: new Tickets(),
  response: new TicketData(),
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setTicketState: <K extends keyof Ticket>(
      state: Ticket,
      action: PayloadAction<AppPayload<Ticket, K>>
    ) => {
      const { value, key } = action.payload;
      state[key] = value;
    },
    setAllTicketState: (state, action: PayloadAction<Ticket>) => {
      state = action.payload as Ticket;
      return state;
    },
  },
});

export const { setAllTicketState, setTicketState } = ticketSlice.actions;
export const ticketReducer = ticketSlice.reducer;
