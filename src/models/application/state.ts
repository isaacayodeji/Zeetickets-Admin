import { FormAction } from "../../utils/helper";
import { CreateTickets } from "../client/request";
import { Booking, BookingData, TicketData, Tickets } from "../client/response";

export interface Ticket {
  showForm: boolean;
  showModal: boolean;
  status: "AVAILABLE" | "CANCELLED";
  category: "VIP" | "VVIP" | "REGULAR";
  page: number;
  size: number;
  action: FormAction;
  record: Tickets;
  request: CreateTickets;
  tickets: Tickets;
  response: TicketData;
}
export interface BookingState {
  showForm: boolean;
  showModal: boolean;
  page: number;
  size: number;
  action: FormAction;
  record: Booking;
  request: [];
  bookings: Booking;
  response: BookingData;
}
