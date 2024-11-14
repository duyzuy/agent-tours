import { SearchBookingFormData } from "./searchBooking.interface";
import { PassengerType } from "@/models/common.interface";
import { CustomerInformation } from "@/models/management/booking/customer.interface";
import { IProductTour } from "@/models/management/booking/product.interface";
import { IReservation } from "@/models/management/booking/reservation.interface";
import { PassengerInformationFormData } from "./passenger.interface";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import { IInvoice } from "@/models/management/booking/invoice.interface";
import { ESellChannel } from "@/constants/channel.constant";
import { IProdutService } from "@/models/management/booking/service.interface";

export interface IProductServiceBookingItem {
  bookingIndex: number;
  serviceItem: IProdutService;
  configItem: IProdutService["configs"][number];
  qty: number;
  type: PassengerType;
}
export interface IProductServiceBookingItemWithoutPax {
  serviceItem: IProdutService;
  configItem: IProdutService["configs"][number];
  qty: number;
  type: PassengerType.ADULT;
}
export interface IProductTourBookingItem {
  configItem: IProductTour["configs"][number];
  index: number;
  type: PassengerType;
  passengerInformation: PassengerInformationFormData;
}

export class BookingInfo {
  product?: IProductTour;
  bookingItems?: IProductTourBookingItem[];
  customerInformation?: CustomerInformation;
  invoiceInfo?: Partial<IInvoice>;
  bookingSsr?: IProductServiceBookingItemWithoutPax[];
  bookingSsrWithPax?: IProductServiceBookingItem[];
  constructor(
    product: IProductTour | undefined,
    bookingItems: IProductTourBookingItem[] | undefined,
    customerInformation: CustomerInformation | undefined,
    invoiceInfo: Partial<IInvoice> | undefined,
    bookingSsr: IProductServiceBookingItemWithoutPax[] | undefined,
    bookingSsrWithPax: IProductServiceBookingItem[] | undefined,
  ) {
    this.product = product;
    this.bookingItems = bookingItems;
    this.customerInformation = customerInformation;
    this.invoiceInfo = invoiceInfo;
    this.bookingSsr = bookingSsr;
    this.bookingSsrWithPax = bookingSsrWithPax;
  }
}

export class AppBookingManager {
  bookingInfo?: BookingInfo;
  passengerPriceConfigs: {
    [PassengerType.ADULT]: {
      qty: number;
      priceConfig: PriceConfig;
    }[];
    [PassengerType.CHILD]: {
      qty: number;
      priceConfig: PriceConfig;
    }[];
    [PassengerType.INFANT]: {
      qty: number;
      priceConfig: PriceConfig;
    }[];
  };
  searchBooking: SearchBookingFormData;
  productList?: IProductTour[];
  serviceList?: IProdutService[];
  reservation?: IReservation;
  channel: ESellChannel;
  agentUserId?: number;

  constructor(
    bookingInfo: BookingInfo | undefined,
    passengerPriceConfigs: {
      [PassengerType.ADULT]: {
        qty: number;
        priceConfig: PriceConfig;
      }[];
      [PassengerType.CHILD]: {
        qty: number;
        priceConfig: PriceConfig;
      }[];
      [PassengerType.INFANT]: {
        qty: number;
        priceConfig: PriceConfig;
      }[];
    },
    searchBooking: SearchBookingFormData,
    productList: IProductTour[],
    serviceList: IProdutService[] | undefined,
    reservation: IReservation | undefined,
    channel: ESellChannel,
    agentUserId: number | undefined,
  ) {
    this.bookingInfo = bookingInfo;
    this.searchBooking = searchBooking;
    this.passengerPriceConfigs = passengerPriceConfigs;
    this.productList = productList;
    this.serviceList = serviceList;
    this.reservation = reservation;
    this.channel = channel;
    this.agentUserId = agentUserId;
  }
}

export interface BookingTourItem {
  index?: number;
  sellableConfigId?: number;
  qty?: number;
  amount?: number;
  type?: PassengerType;
  pax?: Partial<PassengerInformationFormData>;
  ssr?: {
    sellableConfigId: number;
    qty: number;
    amount: number;
    type: PassengerType;
  }[];
}
export interface IBookingTourPayload {
  sellableId?: number;
  bookingDetails: BookingTourItem[];
  bookingSsr?: {
    sellableConfigId: number;
    qty: number;
    amount: number;
    type: PassengerType.ADULT;
  }[];
  channel?: ESellChannel;
  agentUserId?: number;
  custName?: string; //name + phone bắt buộc
  custPhoneNumber?: string; //name + phone bắt buộc
  custEmail?: string;
  custAddress?: string;
  rmk?: string; //ghi chu.
  invoiceName?: string;
  invoiceCompanyName?: string;
  invoiceAddress?: string;
  invoiceTaxCode?: string;
  invoiceEmail?: string;
  referenceId?: string;
  // CustInfoJson?: string; //chưa dùng tới
  // Rmk1?: string;
  // Rmk2?: string;
  // Rmk3?: string;
  // Rmk4?: string;
}
