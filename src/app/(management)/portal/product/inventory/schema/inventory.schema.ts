import { object, string, ObjectSchema, boolean, number } from "yup";
import { IInventoryPayload } from "@/models/management/core/inventory.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import { Status } from "@/models/common.interface";
import { InventoryFormData } from "../modules/inventory.interface";

export const inventorySchema: ObjectSchema<InventoryFormData> = object({
  recId: number(),
  cmsIdentity: string().default(""),
  supplierId: number().required("Chưa chọn Supplier."),
  type: string()
    .oneOf<IInventoryPayload["type"]>([
      EInventoryType.AIR,
      EInventoryType.GUIDE,
      EInventoryType.HOTEL,
      EInventoryType.INSURANCE,
      EInventoryType.LANDPACKAGE,
      EInventoryType.RESTAURANT,
      EInventoryType.TRANSPORT,
      EInventoryType.VISA,
    ])
    .required("Type không bỏ trống."),
  code: string().required("Code không bỏ trống."),
  name: string().required("Tên không bỏ trống."),
  productType: string()
    .oneOf<IInventoryPayload["productType"]>([EProductType.EXTRA, EProductType.TOUR])
    .required("ProductType không bỏ trống."),
  isStock: boolean().default(false),
  status: string()
    .oneOf<IInventoryPayload["status"]>([Status.OK, Status.QQ, Status.XX, Status.OX])
    .required("Trạng thái không bỏ trống."),
});

export const inventoryUpdateSchema: ObjectSchema<{ name: string }> = object({
  name: string().required("Tên không bỏ trống."),
});

// isCreate: boolean().default(true),
// type: string().when("isCreate", {
//     is: true,
//     then: (schema) =>
//         schema
//             .oneOf<IInventoryPayload["type"]>([
//                 EInventoryType.AIR,
//                 EInventoryType.GUIDE,
//                 EInventoryType.HOTEL,
//                 EInventoryType.INSURANCE,
//                 EInventoryType.LANDPACKAGE,
//                 EInventoryType.RESTAURANT,
//                 EInventoryType.TRANSPORT,
//                 EInventoryType.VISA,
//             ])
//             .required("Type không bỏ trống"),
//     otherwise: (schema) => schema.optional(),
// }),
