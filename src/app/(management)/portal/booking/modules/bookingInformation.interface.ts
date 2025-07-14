import { SearchBookingFormData } from "./searchBooking.interface";
import { PassengerType } from "@/models/common.interface";
import { CustomerInformation } from "@/models/management/booking/customer.interface";
import { IProductTour } from "@/models/management/booking/product.interface";
import { IReservation } from "@/models/management/booking/reservation.interface";
import { PassengerInformationFormData } from "./passenger.interface";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import { IInvoice } from "@/models/management/booking/invoice.interface";
import { ESellChannel } from "@/constants/channel.constant";
import { IServiceItem } from "@/models/management/booking/service.interface";

export class PortalBookingInformation {
  product?: IProductTour;
  bookingItems: {
    index: number;
    configItem: IProductTour["configs"][number];
    type: PassengerType;
    passengerInformation?: PassengerInformationFormData;
  }[];
  customerInformation?: CustomerInformation;
  invoiceInfo?: Partial<IInvoice>;
  bookingSsr: {
    serviceItem: IServiceItem;
    configItem: IServiceItem["configs"][number];
    qty: number;
    type: PassengerType.ADULT;
  }[];
  bookingSsrWithPax: {
    bookingIndex: number;
    serviceItem: IServiceItem;
    configItem: IServiceItem["configs"][number];
    qty: number;
    type: PassengerType;
  }[];
  constructor(
    product: IProductTour | undefined,
    bookingItems: {
      configItem: IProductTour["configs"][number];
      index: number;
      type: PassengerType;
      passengerInformation?: PassengerInformationFormData;
    }[],
    customerInformation: CustomerInformation | undefined,
    invoiceInfo: Partial<IInvoice> | undefined,
    bookingSsr: {
      serviceItem: IServiceItem;
      configItem: IServiceItem["configs"][number];
      qty: number;
      type: PassengerType.ADULT;
    }[],
    bookingSsrWithPax: {
      bookingIndex: number;
      serviceItem: IServiceItem;
      configItem: IServiceItem["configs"][number];
      qty: number;
      type: PassengerType;
    }[],
  ) {
    this.product = product;
    this.bookingItems = bookingItems;
    this.customerInformation = customerInformation;
    this.invoiceInfo = invoiceInfo;
    this.bookingSsr = bookingSsr;
    this.bookingSsrWithPax = bookingSsrWithPax;
  }
}

export class PortalBookingManagerFormData {
  bookingInfo: PortalBookingInformation;
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
  serviceList?: IServiceItem[];
  reservation?: IReservation;
  channel: ESellChannel;
  agentUserId?: number;

  constructor(
    bookingInfo: PortalBookingInformation,
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
    serviceList: IServiceItem[] | undefined,
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

export interface IBookingTourPayload {
  sellableId?: number;
  bookingDetails?: {
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
  }[];
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
