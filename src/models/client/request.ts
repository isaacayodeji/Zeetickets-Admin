export class CreateTickets {
  id: number = 0;
  title: string = "";
  price: number = 0;
  description: string = "";
  eventDate: any;
  venue: string = "";
  category: string = "";
  status: string = "";
  slots: number = 0;
  image: string = "";
}

export class GetDataRequest {
  page: number = 1;
  size: number = 10;
}

export class PurchaseBooking {
  email: string = "";
  quantity: number = 0;
  callbackUrl: string = "";
}

export class UpdateTickets {
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
