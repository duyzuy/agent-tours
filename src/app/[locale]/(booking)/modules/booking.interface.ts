import { FeProductItem } from "@/models/fe/productItem.interface";
import { ICustomerInformation } from "@/models/management/booking/customer.interface";
import { IInvoice } from "@/models/management/booking/invoice.interface";
import { PassengerType } from "@/models/common.interface";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import { FePassengerInformationFormData } from "../passenger/modules/passegner.interface";
import { IPromotion } from "@/models/management/core/promotion.interface";
import { FePriceConfig } from "@/models/fe/serviceItem.interface";
import { FeReservation } from "@/models/fe/reservation.interface";

export interface IFeSSRItem {
  priceConfig: PriceConfig;
  qty: number;
  amount: number;
  type: PassengerType;
}
export interface IBookingSsrItemWithPax {
  paxIndex: number;
  paxType: PassengerType;
  sellableDetailId: number;
  serviceName: string;
  priceConfig: FePriceConfig;
}
export interface IFeBookingDetailItem {
  priceConfig: PriceConfig;
  index: number;
  amount: number;
  type: PassengerType;
  pax?: FePassengerInformationFormData;
  ssr?: IFeSSRItem[];
}
export interface FeBookingInformation {
  bookingInfo: {
    product: FeProductItem | undefined;
    couponPolicy: IPromotion | undefined;
    coupons: IPromotion[] | undefined;
    bookingDetails: IFeBookingDetailItem[];
    bookingSsrWithPax: IBookingSsrItemWithPax[] | undefined;
    bookingSsr: IFeSSRItem[] | undefined;
    customerInformation: ICustomerInformation | undefined;
    invoiceInformation: IInvoice | undefined;
    passengers: {
      index: number;
      type: PassengerType;
      info: FePassengerInformationFormData;
    }[];
  };
  servicePriceConfigs: FePriceConfig[] | undefined;
  bookingPassenger: {
    [PassengerType.ADULT]: number;
    [PassengerType.CHILD]: number;
    [PassengerType.INFANT]: number;
  };
  reservation?: FeReservation;
}

export class FeBookingFormData implements FeBookingInformation {
  bookingInfo: {
    product: FeProductItem | undefined;
    couponPolicy: IPromotion | undefined;
    coupons: IPromotion[] | undefined;
    bookingDetails: IFeBookingDetailItem[];
    bookingSsr: IFeSSRItem[] | undefined;
    bookingSsrWithPax: IBookingSsrItemWithPax[] | undefined;
    customerInformation: ICustomerInformation | undefined;
    invoiceInformation: IInvoice | undefined;
    passengers: {
      index: number;
      type: PassengerType;
      info: FePassengerInformationFormData;
    }[];
  };

  servicePriceConfigs: FePriceConfig[] | undefined;
  bookingPassenger: {
    [PassengerType.ADULT]: number;
    [PassengerType.CHILD]: number;
    [PassengerType.INFANT]: number;
  };
  reservation?: FeReservation;
  constructor(
    bookingInfo: {
      product: FeProductItem | undefined;
      couponPolicy: IPromotion | undefined;
      coupons: IPromotion[] | undefined;
      bookingDetails: IFeBookingDetailItem[];
      bookingSsr: IFeSSRItem[] | undefined;
      bookingSsrWithPax: IBookingSsrItemWithPax[] | undefined;
      customerInformation: ICustomerInformation | undefined;
      invoiceInformation: IInvoice | undefined;
      passengers: {
        index: number;
        type: PassengerType;
        info: FePassengerInformationFormData;
      }[];
    },
    servicePriceConfigs: FePriceConfig[] | undefined,
    bookingPassenger: {
      [PassengerType.ADULT]: number;
      [PassengerType.CHILD]: number;
      [PassengerType.INFANT]: number;
    },
    reservation: FeReservation | undefined,
  ) {
    this.bookingInfo = bookingInfo;
    this.bookingPassenger = bookingPassenger;
    this.servicePriceConfigs = servicePriceConfigs;
    this.reservation = reservation;
  }
}
