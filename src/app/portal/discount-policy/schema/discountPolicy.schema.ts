import { ObjectSchema, object, string, number, array, boolean } from "yup";
import { DiscountPolicyFormData } from "../modules/discountPolicy.interface";
import { DiscountType } from "@/models/management/core/discountPolicy.interface";
import { Status } from "@/models/common.interface";
import { IDestination } from "@/models/management/region.interface";

export const discountPolicySchema: ObjectSchema<DiscountPolicyFormData> =
    object({
        name: string().required("Tên không bỏ trống."),
        descriptions: string(),
        validFrom: string().required("Ngày áp dụng không bỏ trống."),
        validTo: string().required("Ngày áp dụng không bỏ trống."),
        type: string().oneOf<DiscountType>([
            DiscountType.COUPON,
            DiscountType.POLICY,
        ]),
        code: string().required("Mã tour không bỏ trống."),
        maxUseTimes: number().when("type", {
            is: DiscountType.COUPON,
            then: (schema) =>
                schema
                    .min(1, "Số lần sử dụng tối thiểu là 1.")
                    .required("Số lần sử dụng không bỏ trống."),
            otherwise: (schema) => schema.optional(),
        }),
        blackoutJson: object({
            byDate: array().of(string()),
            byDaterange: array()
                .of(
                    object({
                        fromDate: string(),
                        toDate: string(),
                    }),
                )
                .default([]),
        }),
        isValidbyDest: boolean().default(false),
        destJson: array<IDestination>().when("isValidbyDest", {
            is: true,
            then: (schema) =>
                schema
                    .of(
                        object({
                            cat: string().required("Không bỏ trống cat"),
                            id: number().required(),
                            codeKey: string().required(
                                "Code key không bỏ trống.",
                            ),
                            codeName: string().required(
                                "Code name không bỏ trống.",
                            ),
                            status: string()
                                .oneOf<Status>([Status.OK])
                                .required(),
                            listStateProvince: array()
                                .of(
                                    object({
                                        recId: number().required("Thiếu ID"),
                                        cat: string()
                                            .oneOf<
                                                | "REGIONLIST"
                                                | "SUBREGIONLIST"
                                                | "COUNTRYLIST"
                                                | "STATEPROVINCELIST"
                                            >([
                                                "REGIONLIST",
                                                "SUBREGIONLIST",
                                                "COUNTRYLIST",
                                                "STATEPROVINCELIST",
                                            ])
                                            .required("Thiếu destJson cat"),
                                        countryKey: string(),
                                        countryName: string(),
                                        regionKey: string(),
                                        stateProvinceKey: string(),
                                        subRegionKey: string(),
                                    }),
                                )
                                .min(1, "Ít nhất phải có 1 điểm đến."),
                        }),
                    )
                    .min(1, "Vui lòng chọn ít nhất 1 điểm đến"),
            otherwise: (schema) => schema.optional(),
        }),
        isValidbyTourCode: boolean().default(false),
        tourCodeJson: array().when("isValidbyTourCode", {
            is: true,
            then: (schema) =>
                schema
                    .of(string().required("Không bỏ trống."))
                    .min(1, "Nhập ít nhất 1 mã tour."),
            otherwise: (schema) => schema.optional(),
        }),
        isValidByTime: boolean().default(false),
        timeJson: array().when("isValidByTime", {
            is: true,
            then: (schema) =>
                schema
                    .of(number().required("Khung thời gian không bỏ trống."))
                    .min(1, "Vui lòng chọn khung thời gian"),
            otherwise: (schema) => schema.optional(),
        }),
        isValidByDayofweek: boolean().default(false),
        dayOfWeek: array().when("isValidByDayofweek", {
            is: true,
            then: (schema) =>
                schema
                    .of(string().required("Khung thời gian không bỏ trống."))
                    .min(1, "Vui lòng chọn ngày"),
            otherwise: (schema) => schema.optional(),
        }),
        discountAmount: number()
            .required("Số tiền giảm không bỏ trống.")
            .min(1, "Số tiền giảm tối thiểu lớn hơn 1"),
        status: string().oneOf<Status>([Status.OK, Status.QQ]),
    });
