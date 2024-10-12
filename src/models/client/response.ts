export class API<T> {
  responseCode: number = 0;
  responseMessage: string = "";
  data: T | undefined;
}

export class PurchaseTicket {
  authorization_url: string = "";
  transactionRef: string = "";
  totalAmount: number = 0;
  quantity: number = 0;
  email: string = "";
}

export class VerifyPayment {
  paymentStatus: string = "";
  reference: string = "";
  gateway_response: string = "";
  amount: number = 0;
  quantity: number = 0;
  paid_at: string = "";
  currency: string = "";
  fees: number = 0;
  customer: Customer[] = new Array<Customer>();
  transactionDate: string = "";
}

export class Customer {
  id: number = 0;
  first_name: string = "";
  last_name: string = "";
  email: string = "";
  customer_code: string = "";
  phone: string = "";
  metadata: any;
  risk_action: string = "";
  international_format_phone: any;
}
export class TableData<T> {
  [key: string]: T;
  constructor(keyName: string, items: T) {
    this[keyName] = items;
  }
}

export class Booking {
  _id: string = "";
  buyerEmail: string = "";
  ticket: string = "";
  quantity: number = 0;
  totalAmount: number = 0;
  paymentStatus: string = "";
  transactionRef: string = "";
  authorizationUrl: string = "";
  status: string = "";
  createdAt: string = "";
  updatedAt: string = "";
}
export class BookingData {
  total: number = 0;
  page: number = 0;
  size: number = 0;
  bookings: Booking[] = new Array<Booking>();
}
export class TicketData {
  total: number = 0;
  page: number = 0;
  size: number = 0;
  tickets: Tickets[] = new Array<Tickets>();
}

export class Tickets {
  _id: number = 0;
  title: string = "";
  price: number = 0;
  description: string = "";
  eventDate: string = "";
  venue: string = "";
  category: string = "";
  status: string = "";
  slots: number = 0;
  image: string = "";
}
