import { IPassengerInformation } from "../management/booking/passengerInformation.interface";
import { PassengerType } from "../common.interface";

export interface FeBookingPayload {
    sellableId?: number;
    bookingDetails?: {
        sellableConfigId?: number;
        index?: number;
        amount?: number;
        type?: PassengerType;
        pax?: IPassengerInformation;
        ssr?: {
            sellableConfigId?: number;
            qty?: number;
            amount?: number;
            type?: PassengerType;
        }[];
    }[];
    bookingSsr?: {
        sellableConfigId?: number;
        qty?: number;
        amount?: number;
        type?: PassengerType;
    }[]; // booking dịch vụ ko theo khách
    custName?: string;
    custPhoneNumber?: string;
    custEmail?: string;
    custAddress?: string;
    rmk?: string;
    referenceId?: string;
    custInfoJson?: string;
    invoiceName?: string;
    invoiceCompanyName?: string;
    invoiceAddress?: string;
    invoiceTaxCode?: string;
    invoiceEmail?: string;
}
