export interface SystemRuleAndPolicyBase {
    recId: number;
    orderId: number;
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
export interface IBookingTimeLitmit extends SystemRuleAndPolicyBase {
    type: "BOOKING_TIMELIMIT";
}
export interface IDepositTimelimit extends SystemRuleAndPolicyBase {
    type: "DEPOSIT";
}
