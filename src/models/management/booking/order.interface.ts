import { BaseResponse } from "../common.interface";
import { Status } from "../common.interface";
import { ITemplateSellable } from "../core/templateSellable.interface";
import { ISellable } from "../core/sellable.interface";
import { PriceConfig } from "../core/priceConfig.interface";
import { IReservation } from "./reservation.interface";

// interface IBookingDetailItem {
//     bookingId: number;
//     sellableConfigId: number;
//     qty: number;
//     amount: number;
//     type: string;
//     booking: IBookingDetail & { pax: IPassengerInformation };
// }
// export interface IBookingOrderDetail {
//     recId: number;
//     bookingOrder: IReservation;
//     bookingDetails: IBookingDetailItem[];
// }

export interface IOrderItem {
    recId: number;
    sellableId: number;
    sellableTemplateId: number;
    custName: string;
    custPhoneNumber: string;
    custEmail: string;
    custAddress: string;
    custInfoJson: string;
    paymentStatus: string;
    totalAmount: number;
    tourPrice: number;
    extraPrice: number;
    charge: number;
    rmk: string;
    rmk1: string;
    rmk2: string;
    rmk3: string;
    rmk4: string;
    status: Status;
    sysFstUser: string;
    sysFstUpdate: string;
    sysLstUser: string;
    sysLstUpdate: string;
    sysBelongTo: string;
    logStatus: string;
    template: ITemplateSellable;
    sellable: ISellable & {
        configs: PriceConfig[] | null;
        template: ITemplateSellable;
    };
}
export interface IOrderListRs extends BaseResponse<IOrderItem[]> {}

export interface IOrderDetail extends IReservation {}
export interface IOrderDetailRs extends BaseResponse<IOrderDetail> {}
