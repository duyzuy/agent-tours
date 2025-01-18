import { FeProductItem } from "@/models/fe/productItem.interface";
import { ICustomerInformation } from "@/models/management/booking/customer.interface";
import { IInvoice } from "@/models/management/booking/invoice.interface";
import { PassengerType } from "@/models/common.interface";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import { FePassengerInformationFormData } from "../passenger/modules/passegner.interface";
import { IPromotion } from "@/models/management/core/promotion.interface";
import { FeProductService } from "@/models/fe/serviceItem.interface";
import { FeReservation } from "@/models/fe/reservation.interface";
import { FeCMSTemplateContent } from "@/models/fe/templateContent.interface";

export interface IBookingSsrItemNoPax {
  inventory: FeProductService["inventory"];
  stock: FeProductService["stock"];
  priceConfig: FeProductService["configs"][number];
  amount: number;
  type: PassengerType;
}
export type IBookingSsrItemWithPax = {
  inventory: FeProductService["inventory"];
  stock: FeProductService["stock"];
  priceConfig: FeProductService["configs"][number];
  paxIndex: number;
  paxType: PassengerType;
};
interface IFeBookingDetailItem {
  priceConfig: PriceConfig;
  index: number;
  amount: number;
  type: PassengerType;
  pax?: FePassengerInformationFormData;
}

export interface FeBookingInformation {
  bookingInfo: {
    cmsTemplate: FeCMSTemplateContent | undefined;
    product: FeProductItem | undefined;
    couponPolicy: IPromotion | undefined;
    coupons: IPromotion[] | undefined;
    bookingDetails: IFeBookingDetailItem[];
    bookingSsrWithPax: IBookingSsrItemWithPax[] | undefined;
    bookingSsr: IBookingSsrItemNoPax[] | undefined;
    customerInformation: ICustomerInformation | undefined;
    invoiceInformation: IInvoice | undefined;
    passengers: {
      index: number;
      type: PassengerType;
      info: FePassengerInformationFormData;
    }[];
  };
  services: FeProductService[] | undefined;
  bookingPassenger: {
    [PassengerType.ADULT]: number;
    [PassengerType.CHILD]: number;
    [PassengerType.INFANT]: number;
  };
  reservation?: FeReservation;
}

export class FeBookingFormData implements FeBookingInformation {
  bookingInfo: {
    cmsTemplate: FeCMSTemplateContent | undefined;
    product: FeProductItem | undefined;
    couponPolicy: IPromotion | undefined;
    coupons: IPromotion[] | undefined;
    bookingDetails: IFeBookingDetailItem[];
    bookingSsr: IBookingSsrItemNoPax[] | undefined;
    bookingSsrWithPax: IBookingSsrItemWithPax[] | undefined;
    customerInformation: ICustomerInformation | undefined;
    invoiceInformation: IInvoice | undefined;
    passengers: {
      index: number;
      type: PassengerType;
      info: FePassengerInformationFormData;
    }[];
  };

  services: FeProductService[] | undefined;
  bookingPassenger: {
    [PassengerType.ADULT]: number;
    [PassengerType.CHILD]: number;
    [PassengerType.INFANT]: number;
  };
  reservation?: FeReservation;
  constructor(
    bookingInfo: {
      cmsTemplate: FeCMSTemplateContent | undefined;
      product: FeProductItem | undefined;
      couponPolicy: IPromotion | undefined;
      coupons: IPromotion[] | undefined;
      bookingDetails: IFeBookingDetailItem[];
      bookingSsr: IBookingSsrItemNoPax[] | undefined;
      bookingSsrWithPax: IBookingSsrItemWithPax[] | undefined;
      customerInformation: ICustomerInformation | undefined;
      invoiceInformation: IInvoice | undefined;
      passengers: {
        index: number;
        type: PassengerType;
        info: FePassengerInformationFormData;
      }[];
    },
    services: FeProductService[] | undefined,
    bookingPassenger: {
      [PassengerType.ADULT]: number;
      [PassengerType.CHILD]: number;
      [PassengerType.INFANT]: number;
    },
    reservation: FeReservation | undefined,
  ) {
    this.bookingInfo = bookingInfo;
    this.bookingPassenger = bookingPassenger;
    this.services = services;
    this.reservation = reservation;
  }
}
