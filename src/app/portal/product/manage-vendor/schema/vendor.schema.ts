import { object, string, ObjectSchema, number, array, boolean } from "yup";

import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { Status } from "@/models/common.interface";

import { VendorFormData } from "../modules/manageVendor.interface";

export const vendorSchema: ObjectSchema<VendorFormData> = object({
    actionType: string()
        .oneOf<"CREATE" | "EDIT">(["CREATE", "EDIT"])
        .default("CREATE"),
    recId: number().when("actionType", {
        is: "EDIT",
        then: (schema) => schema.required("recId không bỏ trống."),
        otherwise: (schema) => schema.optional(),
    }),
    shortName: string().required("Không bỏ trống."),
    typeList: array<EInventoryType[]>()
        .min(1, "Chọn ít nhất 1 loại hình dịch vụ.")
        .required("Loại hình dịch vụ không bỏ trống."),
    fullName: string().required("Không bỏ trống."),
    contact: string().required("Không bỏ trống."),
    address: string().optional(),
    email: string().email("Email không hợp lệ").required("Không bỏ trống."),
    taxCode: string().optional(),
    rmk: string().optional(),
    bankName: string().optional(),
    bankAccountNumber: string().optional(),
    bankAddress: string().optional(),
    paymentType: string().required().oneOf<"CASH">(["CASH"]),
    createDefaultSupplier: boolean().default(false),
    status: string()
        .oneOf<Status.OK | Status.QQ>([Status.OK, Status.QQ])
        .required("Trạng thái không bỏ trống."),
});
