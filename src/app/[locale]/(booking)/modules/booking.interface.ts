import { FeProductItem } from "@/models/fe/productItem.interface";
import { ICustomerInformation } from "@/models/management/booking/customer.interface";
import { IInvoice } from "@/models/management/booking/invoice.interface";
import { PassengerType } from "@/models/common.interface";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import { FePassengerInformationFormData } from "../passenger/modules/passegner.interface";
import { IPromotion } from "@/models/management/core/promotion.interface";

export interface IFeSSRItem {
    priceConfig: PriceConfig;
    qty: number;
    amount: number;
    type: PassengerType;
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
    product?: FeProductItem;
    couponPolicy?: IPromotion;
    coupons?: IPromotion[];
    bookingPassenger: {
        [PassengerType.ADULT]: number;
        [PassengerType.CHILD]: number;
        [PassengerType.INFANT]: number;
    };
    bookingDetails?: IFeBookingDetailItem[];
    bookingSsr?: IFeSSRItem[];
    customerInformation?: ICustomerInformation;
    invoiceInformation?: IInvoice;
}
export class FeBookingFormData implements FeBookingInformation {
    product?: FeProductItem;
    couponPolicy?: IPromotion;
    coupons?: IPromotion[];
    bookingDetails?: IFeBookingDetailItem[];
    bookingPassenger: {
        [PassengerType.ADULT]: number;
        [PassengerType.CHILD]: number;
        [PassengerType.INFANT]: number;
    };
    bookingSsr?: IFeSSRItem[];
    customerInformation?: ICustomerInformation;
    invoiceInformation?: IInvoice;

    constructor(
        product: FeProductItem | undefined,
        couponPolicy: IPromotion | undefined,
        coupons: IPromotion[] | undefined,
        bookingPassenger: {
            [PassengerType.ADULT]: number;
            [PassengerType.CHILD]: number;
            [PassengerType.INFANT]: number;
        },
        bookingDetails: IFeBookingDetailItem[],
        bookingSsr: IFeSSRItem[] | undefined,
        customerInformation: ICustomerInformation | undefined,
        invoiceInformation: IInvoice | undefined,
    ) {
        this.product = product;
        this.coupons = coupons;
        this.couponPolicy = couponPolicy;
        this.bookingDetails = bookingDetails;
        this.bookingPassenger = bookingPassenger;
        this.bookingSsr = bookingSsr;
        this.customerInformation = customerInformation;
        this.invoiceInformation = invoiceInformation;
    }
}
