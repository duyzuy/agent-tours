import { BaseResponse, Status } from "../common.interface";
import { IDestination } from "../region.interface";

export enum DiscountType {
    POLICY = "POLICY",
    COUPON = "COUPON",
}

export interface IDiscountPolicy {
    recId: number;
    code: string;
    name: string;
    validFrom: string;
    validTo: string;
    type: DiscountType;
    used: number;
    blackoutJson: string;
    descriptions: string;
    destJson: string;
    discountAmount: number;
    isValidByTime: boolean;
    isValidbyDest: boolean;
    isValidbyTourCode: boolean;
    isValidByDayofweek: boolean;
    dayOfWeek: string;
    logStatus: string;
    maxUseTimes: number;
    sysBelongTo: string;
    sysFstUpdate: string;
    sysFstUser: string;
    sysLstUpdate: string;
    sysLstUser: string;
    timeJson: string;
    tourCodeJson: string;
    status: Status;
}
export interface IDiscountPolicyPayload {
    name?: string;
    descriptions?: string;
    validFrom?: string; //dateTime
    validTo?: string; //dateTime
    type?: DiscountType;
    code?: string; //UNIQUE BAMUOITHANGTU
    maxUseTimes?: number; //nếu type = COUPON
    blackoutJson?: {
        byDate?: string[];
        byDaterange?: {
            fromDate?: string;
            toDate?: string;
        }[];
    };
    isValidbyDest?: boolean;
    destJson?: IDestination[]; //DesLIST[]
    isValidbyTourCode?: boolean;
    tourCodeJson?: string[]; // string[TH012921, TH8267812]
    isValidByTime?: boolean;
    timeJson?: number[]; //number[] [1,8,9]
    isValidByDayofweek?: boolean;
    dayOfWeek?: string[];
    discountAmount?: number;
    status?: Status;
}

export class DisCountQueryParams {
    requestObject?: {
        type: DiscountType;
        isValid?: boolean;
        status?: Status;
        validFrom?: string;
        validTo?: string;
    };
    pageCurrent?: number;
    pageSize?: number;
    constructor(
        requestObject:
            | {
                  type: DiscountType;
                  isValid: boolean | undefined;
                  status: Status | undefined;
                  validFrom: string | undefined;
                  validTo: string | undefined;
              }
            | undefined,
        pageCurrent: number,
        pageSize: number,
    ) {
        (this.requestObject = requestObject),
            (this.pageCurrent = pageCurrent),
            (this.pageSize = pageSize);
    }
}

export interface IDiscountPolicyListRs
    extends BaseResponse<IDiscountPolicy[]> {}
export interface IDiscountPolicyRs extends BaseResponse<IDiscountPolicy> {}
