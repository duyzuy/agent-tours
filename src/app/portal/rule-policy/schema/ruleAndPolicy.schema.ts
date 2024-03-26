import { ObjectSchema, object, string, array, number, mixed } from "yup";
import { RuleAndPolicyFormData } from "../modules/ruleAndPolicy.interface";

export const ruleAndPolicyCreateSchema: ObjectSchema<RuleAndPolicyFormData> =
    object({
        cat: string().required("Không bỏ trống."), //lấy từ core
        catName: string().required("Không bỏ trống."), //lấy từ core
        rule: string().required("Không bỏ trống."), //lấy từ core
        ruleName: string().required("Không bỏ trống."), //lấy từ core
        maTour: string().required("Không bỏ trống."),
        soNgay: number()
            .min(0, "Tối thiểu là 0.")
            .max(365, "Tối đa 365 ngày.")
            .typeError("Số ngày không hợp lệ, phải là chữ số.")
            .integer("Số ngày không hợp lệ, phải là chữ số."),
        soTien: number()
            .typeError("Số tiền không hợp lệ, phải là chữ số.")
            .integer("Số tiền không hợp lệ, phải là chữ số."),
        soGio: number()
            .min(0, "Tối thiểu là 0.")
            .max(24, "Tối đa 24 giờ.")
            .typeError("Số giờ không hợp lệ, phải là chữ số.")
            .integer("Số giờ không hợp lệ, phải là chữ số."),
        destId: number(),
    });
