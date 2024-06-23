import { DiscountType } from "./discountPolicy.interface";

export interface IPromotion {
    isValid: boolean;
    validFrom: string;
    validTo: string;
    message: string;
    type: DiscountType;
    name: string;
    descriptions: string;
    discountAmount: number;
}
