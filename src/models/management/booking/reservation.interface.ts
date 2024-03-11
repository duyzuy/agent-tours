import { BaseResponse, Status } from "../common.interface";

export interface IReservation {
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
}

export interface ReservationRs extends BaseResponse<IReservation> {}
export interface ReservationListRs extends BaseResponse<IReservation[]> {}
export class BookingOrderListQueryParams {
    requestObject: object | undefined;
    pageCurrent: number;
    pageSize: number;
    constructor(
        requestObject: undefined,
        pageCurrent: number,
        pageSize: number,
    ) {
        this.requestObject = requestObject;
        this.pageCurrent = pageCurrent;
        this.pageSize = pageSize;
    }
}
