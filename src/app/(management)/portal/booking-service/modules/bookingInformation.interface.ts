import { SearchBookingFormData } from "./searchBooking.interface";
import { PassengerType } from "@/models/common.interface";
import { CustomerInformation } from "@/models/management/booking/customer.interface";
import { IReservation } from "@/models/management/booking/reservation.interface";
import { IInvoice } from "@/models/management/booking/invoice.interface";
import { ESellChannel } from "@/constants/channel.constant";
import { IProductService } from "@/models/management/booking/product.interface";

export class PortalBookingServiceFormData {
  bookingInfo: {
    product?: IProductService;
    customerInformation?: CustomerInformation;
    invoiceInfo?: Partial<IInvoice>;
    bookingSsr: {
      serviceItem: IProductService;
      configItem: IProductService["configs"][number];
      qty: number;
      type: PassengerType.ADULT;
    }[];
  };
  searchBooking: SearchBookingFormData;
  productList?: IProductService[];
  serviceList?: IProductService[];
  reservation?: IReservation;
  channel: ESellChannel;
  agentUserId?: number;

  constructor(
    bookingInfo: {
      product?: IProductService;
      customerInformation?: CustomerInformation;
      invoiceInfo?: Partial<IInvoice>;
      bookingSsr: {
        serviceItem: IProductService;
        configItem: IProductService["configs"][number];
        qty: number;
        type: PassengerType.ADULT;
      }[];
    },
    searchBooking: SearchBookingFormData,
    productList: IProductService[],
    serviceList: IProductService[] | undefined,
    reservation: IReservation | undefined,
    channel: ESellChannel,
    agentUserId: number | undefined,
  ) {
    this.bookingInfo = bookingInfo;
    this.searchBooking = searchBooking;
    this.productList = productList;
    this.serviceList = serviceList;
    this.reservation = reservation;
    this.channel = channel;
    this.agentUserId = agentUserId;
  }
}

export interface BookingServicePayload {
  sellableId?: number;
  bookingSsr?: {
    sellableConfigId: number;
    qty: number;
    amount: number;
    type: PassengerType.ADULT;
  }[];
  channel?: ESellChannel;
  agentUserId?: number;
  custName?: string;
  custPhoneNumber?: string;
  custEmail?: string;
  custAddress?: string;
  rmk?: string;
  invoiceName?: string;
  invoiceCompanyName?: string;
  invoiceAddress?: string;
  invoiceTaxCode?: string;
  invoiceEmail?: string;
  referenceId?: string;
}
