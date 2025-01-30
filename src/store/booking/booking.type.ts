import { FeProductItem } from "@/models/fe/productItem.interface";
import { FeCMSTemplateContent } from "@/models/fe/templateContent.interface";
import { IPromotion } from "@/models/management/core/promotion.interface";
import { PassengerType } from "@/models/common.interface";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import { FeProductService } from "@/models/fe/serviceItem.interface";
import { ICustomerInformation } from "@/models/management/booking/customer.interface";
import { IInvoice } from "@/models/management/booking/invoice.interface";
import { FeReservation } from "@/models/fe/reservation.interface";
import { FePassengerInformationFormData } from "@/modules/fe/booking/passenger/passegner.interface";

type BookingServiceItem = {
  inventory: FeProductService["inventory"];
  stock: FeProductService["stock"];
  priceConfig: FeProductService["configs"][number];
  amount: number;
  paxType: PassengerType;
};

export interface FeBookingInformation {
  bookingInfo: {
    cmsTemplate: FeCMSTemplateContent | undefined;
    product: FeProductItem | undefined;
    couponPolicy: IPromotion | undefined;
    coupons: IPromotion[] | undefined;
    bookingDetails: {
      priceConfig: PriceConfig;
      index: number;
      amount: number;
      type: PassengerType;
      pax?: FePassengerInformationFormData;
    }[];
    bookingSsrWithPax: (BookingServiceItem & { paxIndex: number })[] | undefined;
    bookingSsr: BookingServiceItem[] | undefined;
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
    bookingDetails: {
      priceConfig: PriceConfig;
      index: number;
      amount: number;
      type: PassengerType;
      pax?: FePassengerInformationFormData;
    }[];
    bookingSsr: BookingServiceItem[] | undefined;
    bookingSsrWithPax: (BookingServiceItem & { paxIndex: number })[] | undefined;
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
      bookingDetails: {
        priceConfig: PriceConfig;
        index: number;
        amount: number;
        type: PassengerType;
        pax?: FePassengerInformationFormData;
      }[];
      bookingSsr: BookingServiceItem[] | undefined;
      bookingSsrWithPax: (BookingServiceItem & { paxIndex: number })[] | undefined;
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
