export interface IBookingTimeLitmit {
    recId: number;
    orderId: number;
    type: "BOOKING_TIMELIMIT";
    rmk: string;
    deadline: string;
    validFrom: string;
    validTo: string;
    status: string;
    sysFstUser: string;
    sysFstUpdate: string;
    sysLstUser: string;
    sysLstUpdate: string;
    sysBelongTo: string;
    logStatus: string;
    isCompleted: boolean;
    isExpired: boolean;
    maximumAmount: number;
    minimumAmount: number;
}
