import { IInvoice } from "@/models/management/booking/invoice.interface";
import { Status } from "@/models/common.interface";

export interface IBookingOrderCustomerItem {
    recId?: number;
    custName?: string;
    custPhoneNumber?: string;
    custEmail?: string;
    custAddress?: string;
    rmk?: string;
}

export class BookingOrderCustomerFormData implements IBookingOrderCustomerItem {
    recId?: number;
    custName?: string;
    custPhoneNumber?: string;
    custEmail?: string;
    custAddress?: string;
    rmk?: string;

    constructor(
        recId: number | undefined,
        custName: string,
        custPhoneNumber: string,
        custEmail: string,
        custAddress: string,
        rmk: string,
    ) {
        this.recId = recId;
        this.custName = custName;
        this.custPhoneNumber = custPhoneNumber;
        this.custEmail = custEmail;
        this.custAddress = custAddress;
        this.rmk = rmk;
    }
}

export class BookingOrderInvoiceFormData implements Partial<IInvoice> {
    recId?: number;
    invoiceAddress?: string | undefined;
    invoiceCompanyName?: string | undefined;
    invoiceEmail?: string | undefined;
    invoiceName?: string | undefined;
    invoiceTaxCode?: string | undefined;

    constructor(
        recId: number | undefined,
        invoiceAddress: string | undefined,
        invoiceCompanyName: string | undefined,
        invoiceEmail: string | undefined,
        invoiceName: string | undefined,
        invoiceTaxCode: string | undefined,
    ) {
        this.recId = recId;
        this.invoiceAddress = invoiceAddress;
        this.invoiceCompanyName = invoiceCompanyName;
        this.invoiceEmail = invoiceEmail;
        this.invoiceName = invoiceName;
        this.invoiceTaxCode = invoiceTaxCode;
    }
}

export interface IBookingOrderPassengerItem {
    recId?: number;
    bookingRefId?: number;
    pax: {
        recId?: number;
        paxTitle?: string;
        paxLastname?: string;
        paxMiddleFirstName?: string;
        paxGender?: string;
        paxBirthDate?: string;
        paxBirthYear?: number;
        paxPhoneNumber?: string;
        paxAddress?: string;
        paxIdNumber?: string;
        paxNationality?: string;
        paxPassportNumber?: string;
        paxPassortExpiredDate?: string;
        paxInfoJson?: string;
    };
}

export class BookingOrderPassengerFormData {
    recId?: number;
    paxTitle?: string;
    paxLastname?: string;
    paxMiddleFirstName?: string;
    paxGender?: string;
    paxBirthDate?: string;
    paxBirthYear?: number;
    paxPhoneNumber?: string;
    paxAddress?: string;
    paxIdNumber?: string;
    paxNationality?: string;
    paxPassportNumber?: string;
    paxPassortExpiredDate?: string;
    paxInfoJson?: string;
    constructor(
        recId: number | undefined,
        paxTitle: string | undefined,
        paxLastname: string | undefined,
        paxMiddleFirstName: string | undefined,
        paxGender: string | undefined,
        paxBirthDate: string | undefined,
        paxBirthYear: number | undefined,
        paxPhoneNumber: string | undefined,
        paxAddress: string | undefined,
        paxIdNumber: string | undefined,
        paxNationality: string | undefined,
        paxPassportNumber: string | undefined,
        paxPassortExpiredDate: string | undefined,
        paxInfoJson: string | undefined,
    ) {
        this.recId = recId;
        this.paxTitle = paxTitle;
        this.paxLastname = paxLastname;
        this.paxMiddleFirstName = paxMiddleFirstName;
        this.paxGender = paxGender;
        this.paxBirthDate = paxBirthDate;
        this.paxBirthYear = paxBirthYear;
        this.paxPhoneNumber = paxPhoneNumber;
        this.paxAddress = paxAddress;
        this.paxIdNumber = paxIdNumber;
        this.paxNationality = paxNationality;
        this.paxPassportNumber = paxPassportNumber;
        this.paxPassortExpiredDate = paxPassortExpiredDate;
        this.paxInfoJson = paxInfoJson;
    }
}

export interface IBookingOrderCustomerPayload {
    bookingOrder?: IBookingOrderCustomerItem;
}

export interface IBookingOrderInvoiceInfoPayload {
    bookingOrder: Partial<IInvoice> & {
        recId?: number;
    };
}
export interface IBookingOrderPassengersPayload {
    bookingOrder?: { recId: number };
    bookingDetails?: { booking: IBookingOrderPassengerItem }[];
}

export interface IBookingOrderCancelPayload {
    bookingOrder: {
        recId?: number;
        rmk4?: string;
    };
}
