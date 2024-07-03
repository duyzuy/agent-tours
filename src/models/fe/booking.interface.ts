import { BaseResponse, PassengerType } from "../common.interface";
import { IPromotion } from "../management/core/promotion.interface";

interface FePassengerInformationPayload {
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
}
export interface FeBookingPayload {
    sellableId?: number;
    bookingDetails?: {
        sellableConfigId: number;
        index: number;
        amount: number;
        type: PassengerType;
        pax: FePassengerInformationPayload;
        ssr?: {
            sellableConfigId: number;
            qty: number;
            amount: number;
            type: PassengerType;
        }[];
    }[];
    bookingSsr?: {
        sellableConfigId?: number;
        qty?: number;
        amount?: number;
        type?: PassengerType;
    }[]; // booking dịch vụ ko theo khách
    counpons?: IPromotion[];
    couponPolicy?: IPromotion;
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
