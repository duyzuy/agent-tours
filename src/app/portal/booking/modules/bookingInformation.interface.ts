import { SearchBookingFormData } from "./searchBooking.interface";
import { PassengerType } from "@/models/management/common.interface";
import { CustomerInformation } from "@/models/management/booking/customer.interface";
import { IProductItem } from "@/models/management/booking/productItem.interface";
import { IReservation } from "@/models/management/booking/reservation.interface";
import { PassengerInformationFormData } from "./passenger.interface";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import { IInvoice } from "@/models/management/booking/invoice.interface";

export interface IPricingBookingItem {
    sellableDetailsId: number;
    priceConfigRecId: number;
    item: IProductItem["configs"][0];
    qty: number;
    type: PassengerType;
}
export interface IBookingItem {
    item: IProductItem["configs"][0];
    index: number;
    type: PassengerType;
    passengerInformation: PassengerInformationFormData;
    ssr: IPricingBookingItem[];
}

export class BookingInfo {
    product?: IProductItem;
    bookingItems?: IBookingItem[];
    customerInformation?: CustomerInformation;
    invoiceInfo?: Partial<IInvoice>;
    constructor(
        product: IProductItem | undefined,
        bookingItems: IBookingItem[] | undefined,
        customerInformation: CustomerInformation | undefined,
        invoiceInfo: Partial<IInvoice> | undefined,
    ) {
        this.product = product;
        this.bookingItems = bookingItems;
        this.customerInformation = customerInformation;
        this.invoiceInfo = invoiceInfo;
    }
}

export class BookingInformation {
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
    productList?: IProductItem[];
    serviceList?: PriceConfig[];
    reservation?: IReservation;

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
        productList: IProductItem[],
        serviceList: PriceConfig[],
        reservation: IReservation | undefined,
    ) {
        this.bookingInfo = bookingInfo;
        this.searchBooking = searchBooking;
        this.passengerPriceConfigs = passengerPriceConfigs;
        this.productList = productList;
        this.serviceList = serviceList;
        this.reservation = reservation;
    }
}

export interface BookingTourItem {
    index?: number;
    sellableConfigId?: number;
    qty?: number;
    amount?: number;
    type?: PassengerType;
    pax?: Partial<PassengerInformationFormData>;
    ssr: {
        sellableConfigId: number;
        qty: number;
        amount: number;
        type: PassengerType;
    }[];
}
export interface IBookingTourPayload {
    sellableId?: number;
    bookingDetails: BookingTourItem[];
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
