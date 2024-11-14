import { object, string, ObjectSchema, number, array } from "yup";
import { Status } from "@/models/common.interface";
import { SupplierFormData } from "../modules/manageSupplier.interface";
import { EVendorPaymentType } from "@/models/management/vendor.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";

export const supplierSchema: ObjectSchema<SupplierFormData> = object({
  actionType: string().oneOf<"CREATE" | "EDIT">(["CREATE", "EDIT"]).default("CREATE"),
  vendorId: number().required("Thiếu VendorId."),
  recId: number().when("actionType", {
    is: "EDIT",
    then: (schema) => schema.required("recId không bỏ trống."),
    otherwise: (schema) => schema.optional(),
  }),
  shortName: string().required("Không bỏ trống."),
  fullName: string().required("Không bỏ trống."),
  contact: string().required("Không bỏ trống."),
  address: string().optional(),
  email: string().email("Email không hợp lệ").required("Không bỏ trống."),
  taxCode: string().optional(),
  rmk: string().optional(),
  bankName: string().optional(),
  bankAccountNumber: string().optional(),
  bankSwiftcode: string(),
  paymentTerm: string(),
  paymentType: string().oneOf<EVendorPaymentType>([
    EVendorPaymentType.CASH,
    EVendorPaymentType.POSTPAID,
    EVendorPaymentType.PREPAID,
  ]),
  typeList: array<EInventoryType[]>()
    .min(1, "Chọn ít nhất 1 loại hình dịch vụ.")
    .required("Loại hình dịch vụ không bỏ trống."),
  bankAddress: string().optional(),
  status: string().oneOf<Status.OK | Status.QQ>([Status.OK, Status.QQ]).required("Trạng thái không bỏ trống."),
});
