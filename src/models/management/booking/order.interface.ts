import { BaseResponse } from "../common.interface";
import { IBookingDetail } from "./bookingDetail.interface";
import { IPassengerInformation } from "./passengerInformation.interface";
import { IReservation } from "./reservation.interface";

interface IBookingDetailItem {
    bookingId: number;
    sellableConfigId: number;
    qty: number;
    amount: number;
    type: string;
    booking: IBookingDetail & { pax: IPassengerInformation };
}
export interface IBookingOrderDetail {
    recId: number;
    bookingOrder: IReservation;
    bookingDetails: IBookingDetailItem[];
}

export interface IBookingOrderDetailRs
    extends BaseResponse<IBookingOrderDetail> {}
