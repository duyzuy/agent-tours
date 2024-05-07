import {
    IDiscountPolicyPayload,
    DiscountType,
} from "@/models/management/core/discountPolicy.interface";
import { Status } from "@/models/management/common.interface";
import {
    IDestination,
    IStateProvince,
} from "@/models/management/region.interface";

export class DiscountPolicyFormData {
    name?: string;
    descriptions?: string;
    validFrom?: string; //dateTime
    validTo?: string; //dateTime
    type?: DiscountType;
    code?: string; //UNIQUE BAMUOITHANGTU
    maxUseTimes?: number; //nếu type = COUPON
    blackoutJson?: {
        byDate?: (string | undefined)[];
        byDaterange?: (
            | {
                  fromDate?: string;
                  toDate?: string;
              }
            | undefined
        )[];
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
    constructor(
        name: string | undefined,
        descriptions: string | undefined,
        validFrom: string | undefined, //dateTime
        validTo: string | undefined, //dateTime
        type: DiscountType | undefined,
        code: string | undefined, //UNIQUE BAMUOITHANGTU
        maxUseTimes: number | undefined, //nếu type = COUPON
        blackoutJson:
            | {
                  byDate: (string | undefined)[] | undefined;
                  byDaterange:
                      | (
                            | {
                                  fromDate: string | undefined;
                                  toDate: string | undefined;
                              }
                            | undefined
                        )[]
                      | undefined;
              }
            | undefined,
        isValidbyDest: boolean | undefined,
        destJson: IDestination[] | undefined, //DesLIST[]
        isValidbyTourCode: boolean | undefined,
        tourCodeJson: string[], // string[TH012921, TH8267812]
        isValidByTime: boolean,
        timeJson: number[], //number[] [1,8,9]
        isValidByDayofweek: boolean,
        dayOfWeek: string[], //[Sunday, Monday...]
        discountAmount: number,
        status: Status | undefined,
    ) {
        this.name = name;
        this.descriptions = descriptions;
        this.validFrom = validFrom;
        this.validTo = validTo;
        this.type = type;
        this.code = code;
        this.maxUseTimes = maxUseTimes;
        this.blackoutJson = blackoutJson;
        this.isValidbyDest = isValidbyDest;
        this.destJson = destJson;
        this.isValidbyTourCode = isValidbyTourCode;
        this.tourCodeJson = tourCodeJson;
        this.isValidByTime = isValidByTime;
        this.timeJson = timeJson;
        this.isValidByDayofweek = isValidByDayofweek;
        this.dayOfWeek = dayOfWeek;
        this.discountAmount = discountAmount;
        this.status = status;
    }
}
