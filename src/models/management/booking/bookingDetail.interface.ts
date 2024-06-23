import { PassengerType, Status } from "../../common.interface";

export interface IBookingDetail {
    recId: number;
    orderId: number;
    sellableId: number;
    bookingRefId: number;
    sellableConfigId: number;
    configJson: string;
    channel: string;
    class: string;
    type: PassengerType;
    quantity: number;
    amount: number;
    status: Status;
    sysFstUser: string;
    sysFstUpdate: string;
    sysLstUser: string;
    sysLstUpdate: string;
    sysBelongTo: string;
    logStatus: string;
}
