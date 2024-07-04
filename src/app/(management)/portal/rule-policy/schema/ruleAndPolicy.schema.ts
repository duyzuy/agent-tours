import { ObjectSchema, object, string, number } from "yup";
import {
    DepositRuleAndPolicyFormData,
    LimitTimeBookingRuleAndPolicyFormData,
    PenaltyRuleAndPolicyFormData,
} from "../modules/ruleAndPolicy.interface";
import {
    PolicyCat,
    PolicyRule,
    PolicyType,
} from "@/models/management/core/ruleAndPolicy.interface";

export const depositRuleAndPolicyCreateSchema: ObjectSchema<DepositRuleAndPolicyFormData> =
    object({
        type: string()
            .oneOf<PolicyType>([PolicyType.DEPOSIT])
            .required("Chưa chọn loại."), //lấy từ core
        typeName: string(),
        cat: string()
            .oneOf<PolicyCat>(
                [
                    PolicyCat.BYAGENT,
                    PolicyCat.BYDESTINATION,
                    PolicyCat.BYTOURCODE,
                ],
                "Cat không hợp lệ.",
            )
            .required("Chưa chọn loại."), //lấy từ core
        catName: string().required("Không bỏ trống."), //lấy từ core
        rule: string()
            .oneOf<PolicyRule>(
                [
                    PolicyRule["30BEFOR_DEPART"],
                    PolicyRule["50BEFOR_DEPART"],
                    PolicyRule["70BEFOR_DEPART"],
                    PolicyRule["100BEFOR_DEPART"],
                    PolicyRule.AMOUNTBEFOR_DEPART,
                ],
                "Rule không hợp lệ.",
            )
            .required("Chưa chọn quy tắc."),
        ruleName: string().required("Không bỏ trống."), //lấy từ core
        maTour: string().when("cat", {
            is: PolicyCat.BYTOURCODE,
            then: (schema) => schema.required("Không bỏ trống mã tour."),
            //lấy từ core
            otherwise: (schema) => schema.optional(),
        }),
        soNgay: number()
            .min(0, "Tối thiểu là 0.")
            .max(365, "Tối đa 365 ngày.")
            .typeError("Số ngày không hợp lệ, phải là chữ số.")
            .integer("Số ngày không hợp lệ, phải là chữ số.")
            .required("Vui lòng nhập số ngày"),
        soTien: number().when("rule", {
            is: PolicyRule.AMOUNTBEFOR_DEPART,
            then: (schema) =>
                schema
                    .required("Không bỏ trống mã tour.")
                    .typeError("Số tiền không hợp lệ, phải là chữ số.")
                    .integer("Số tiền không hợp lệ, phải là chữ số."),
            //lấy từ core
            otherwise: (schema) => schema.optional(),
        }),
        destId: number().when("cat", {
            is: PolicyCat.BYDESTINATION,
            then: (schema) => schema.required("Vui lòng chọn nhóm điểm đến."),
            otherwise: (schema) => schema.optional(),
        }),
    });

export const limitBookingTimeRuleAndPolicyCreateSchema: ObjectSchema<LimitTimeBookingRuleAndPolicyFormData> =
    object({
        type: string()
            .oneOf<PolicyType>([PolicyType.BOOKING_TIMELIMIT])
            .required("Chưa chọn loại."), //lấy từ core
        typeName: string(),
        cat: string()
            .oneOf<PolicyCat>(
                [PolicyCat.BYDESTINATION, PolicyCat.BYTOURCODE],
                "Cat không hợp lệ.",
            )
            .required("Chưa chọn loại."), //lấy từ core
        catName: string().required("Không bỏ trống."), //lấy từ core
        rule: string()
            .oneOf<PolicyRule>(
                [PolicyRule.HOURSAFTER_BOOK],
                "Rule không hợp lệ.",
            )
            .required("Chưa chọn quy tắc."),

        ruleName: string().required("Không bỏ trống."), //lấy từ core
        maTour: string().when("cat", {
            is: PolicyCat.BYTOURCODE,
            then: (schema) => schema.required("Không bỏ trống mã tour."),
            otherwise: (schema) => schema.optional(),
        }),
        soGio: number()
            .min(0, "Tối thiểu là 0.")
            .max(2400, "Tối đa 2400 giờ.")
            .typeError("Số giờ không hợp lệ, phải là chữ số.")
            .integer("Số giờ không hợp lệ, phải là chữ số.")
            .required("Số giờ không bỏ trống"),
        destId: number().when("cat", {
            is: PolicyCat.BYDESTINATION,
            then: (schema) => schema.required("Vui lòng chọn nhóm điểm đến."),
            otherwise: (schema) => schema.optional(),
        }),
    });

export const penaltyRuleAndPolicyCreateSchema: ObjectSchema<PenaltyRuleAndPolicyFormData> =
    object({
        type: string()
            .oneOf<PolicyType>([PolicyType.PENALTY])
            .required("Chưa chọn loại."), //lấy từ core
        typeName: string(),
        cat: string()
            .oneOf<PolicyCat>(
                [PolicyCat.BYDESTINATION, PolicyCat.BYTOURCODE],
                "Cat không hợp lệ.",
            )
            .required("Chưa chọn loại."), //lấy từ core
        catName: string().required("Không bỏ trống."), //lấy từ core
        rule: string()
            .oneOf<PolicyRule>(
                [
                    PolicyRule["30TOTAL"],
                    PolicyRule["50TOTAL"],
                    PolicyRule["70TOTAL"],
                    PolicyRule["100TOTAL"],
                    PolicyRule.FIXAMOUNT,
                ],
                "Rule không hợp lệ.",
            )
            .required("Chưa chọn quy tắc."),
        ruleName: string().required("Không bỏ trống."), //lấy từ core
        maTour: string().when("cat", {
            is: PolicyCat.BYTOURCODE,
            then: (schema) => schema.required("Không bỏ trống mã tour."),
            //lấy từ core
            otherwise: (schema) => schema.optional(),
        }),
        soNgay: number()
            .min(0, "Tối thiểu là 0.")
            .max(365, "Tối đa 365 ngày.")
            .typeError("Số ngày không hợp lệ, phải là chữ số.")
            .integer("Số ngày không hợp lệ, phải là chữ số.")
            .required("Vui lòng nhập số ngày"),
        soTien: number().when("rule", {
            is: PolicyRule.FIXAMOUNT,
            then: (schema) =>
                schema
                    .required("Không bỏ trống mã tour.")
                    .typeError("Số tiền không hợp lệ, phải là chữ số.")
                    .integer("Số tiền không hợp lệ, phải là chữ số."),
            //lấy từ core
            otherwise: (schema) => schema.optional(),
        }),
        destId: number().when("cat", {
            is: PolicyCat.BYDESTINATION,
            then: (schema) => schema.required("Vui lòng chọn nhóm điểm đến."),
            otherwise: (schema) => schema.optional(),
        }),
    });
