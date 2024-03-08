import { PassengerType } from "../common.interface";

export interface BookingDetailItem {
    index?: number;
    indexRef?: number;
    sellableConfigId?: number;
    bookingRefId?: number;
    qty?: number;
    amount?: number;
    type?: PassengerType;
    pax?: {};
}
export interface BookingInformationPayload {
    sellableId?: number;
    bookingDetails: BookingDetailItem[];
    custName?: string; //name + phone bắt buộc
    custPhoneNumber?: string; //name + phone bắt buộc
    custEmail?: string;
    custAddress?: string;
    rmk?: string; //ghi chu.
    // CustInfoJson?: string; //chưa dùng tới
    // Rmk1?: string;
    // Rmk2?: string;
    // Rmk3?: string;
    // Rmk4?: string;
}
