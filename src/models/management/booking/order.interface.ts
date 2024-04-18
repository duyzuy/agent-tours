import { BaseResponse, PaymentStatus } from "../common.interface";
import { Status } from "../common.interface";
import { ITemplateSellable } from "../core/templateSellable.interface";
import { ISellable } from "../core/sellable.interface";
import { PriceConfig } from "../core/priceConfig.interface";
import { IReservation } from "./reservation.interface";
import { IFormOfPayment } from "../core/formOfPayment.interface";
import { IBookingTimeLitmit } from "../core/bookingTimeLimit.interface";

export interface IOrderItem {
    recId: number;
    sellableId: number;
    sellableTemplateId: number;
    custName: string;
    custPhoneNumber: string;
    custEmail: string;
    custAddress: string;
    custInfoJson: string;
    paymentStatus: PaymentStatus;
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
    invoiceName: string;
    invoiceCompanyName: string;
    invoiceAddress: string;
    invoiceTaxCode: string;
    invoiceEmail: string;
    fops: IFormOfPayment[];
    rulesAndPolicies: {
        bookingTimelimits: IBookingTimeLitmit[];
        depositTimelimits: [];
        penalties: [];
    };
}
export interface IOrderListRs extends BaseResponse<IOrderItem[]> {}

export interface IOrderDetail extends IReservation {
    fops: IFormOfPayment[];
    rulesAndPolicies: {
        bookingTimelimits: IBookingTimeLitmit[];
        depositTimelimits: [];
        penalties: [];
    };
}
export interface IOrderDetailRs extends BaseResponse<IOrderDetail> {}
