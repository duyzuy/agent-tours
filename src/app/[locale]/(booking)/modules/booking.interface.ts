import { FeProductItem } from "@/models/fe/productItem.interface";
import { ICustomerInformation } from "@/models/management/booking/customer.interface";
import { IInvoice } from "@/models/management/booking/invoice.interface";

import {
    IFeBookingDetailItem,
    IFeSSRItem,
} from "@/models/fe/booking.interface";

export interface FeBookingInformation {
    product?: FeProductItem;
    bookingDetails?: IFeBookingDetailItem[];
    bookingSsr?: IFeSSRItem[];
    customerInformation?: ICustomerInformation;
    invoiceInformation?: IInvoice;
}
export class FeBookingFormData implements FeBookingInformation {
    product?: FeProductItem;
    bookingDetails?: IFeBookingDetailItem[];
    bookingSsr?: IFeSSRItem[];
    customerInformation?: ICustomerInformation;
    invoiceInformation?: IInvoice;

    constructor(
        product: FeProductItem | undefined,
        bookingDetails: IFeBookingDetailItem[],
        bookingSsr: IFeSSRItem[] | undefined,
        customerInformation: ICustomerInformation | undefined,
        invoiceInformation: IInvoice | undefined,
    ) {
        this.product = product;
        this.bookingDetails = bookingDetails;
        this.bookingSsr = bookingSsr;
        this.customerInformation = customerInformation;
        this.invoiceInformation = invoiceInformation;
    }
}
