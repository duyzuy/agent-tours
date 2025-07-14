import { PassengerType } from "@/models/common.interface";
import { CustomerInformation } from "@/models/management/booking/customer.interface";
import { IReservation } from "@/models/management/booking/reservation.interface";
import { IInvoice } from "@/models/management/booking/invoice.interface";
import { ESellChannel } from "@/constants/channel.constant";
import { IProductService } from "@/models/management/booking/product.interface";
import { SearchProductFormData } from "@/modules/admin/booking/searchProduct.interface";

export class PortalBookingServiceFormData {
  bookingInfo: {
    product?: IProductService;
    customerInformation?: CustomerInformation;
    invoiceInfo?: Partial<IInvoice>;
    bookingSsr: {
      configItem: IProductService["configs"][number];
      qty: number;
      type: PassengerType;
    }[];
  };
  searchBooking: SearchProductFormData;
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
        configItem: IProductService["configs"][number];
        qty: number;
        type: PassengerType;
      }[];
    },
    searchBooking: SearchProductFormData,
    serviceList: IProductService[] | undefined,
    reservation: IReservation | undefined,
    channel: ESellChannel,
    agentUserId: number | undefined,
  ) {
    this.bookingInfo = bookingInfo;
    this.searchBooking = searchBooking;
    this.serviceList = serviceList;
    this.reservation = reservation;
    this.channel = channel;
    this.agentUserId = agentUserId;
  }
}
