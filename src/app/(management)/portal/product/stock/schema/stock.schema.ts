import { object, string, ObjectSchema, boolean, number, array } from "yup";
import { StockAdjustFormData, StockConfirmFormData, StockFormData } from "../modules/stock.interface";
import { EStockType } from "@/models/management/core/inventoryType.interface";

export const stockSchema: ObjectSchema<StockFormData> = object({
  inventoryId: number().required("inventoryId Bị thiếu."),
  isCreateSeries: boolean().default(false),
  type: string()
    .oneOf<EStockType>([
      EStockType.AIRTICKET,
      EStockType.CRUISE,
      EStockType.GUIDE,
      EStockType.INSURANCE,
      EStockType.OTHER,
      EStockType.PACKAGE,
      EStockType.ROOM,
      EStockType.TABLE,
      EStockType.TOURPACKAGE,
      EStockType.VEHICLE,
      EStockType.VISASERVICES,
    ])
    .required("Type không bỏ trống."),
  code: string().required("Code không bỏ trống."),
  description: string(),
  cap: number().required("Số lượng không bỏ trống.").min(1, "Tối thiểu lớn hơn 1."),
  valid: string().required("Không bỏ trống"),
  validTo: string().required("Không bỏ trống"),
  start: string().required("Không bỏ trống"),
  end: string().required("Không bỏ trống"),
  fromValidTo: string().when("isCreateSeries", {
    is: true,
    then: (schema) => schema.required("Ngày kết thúc không bỏ trống."),
    otherwise: (schema) => schema.optional(),
  }),
  everyDayofweek: array().of(string().required()).default([]),
  //Sunday Monday Tuesday Wednesday Thursday Friday Saturday (global/us locale)
  repeatAfter: number().default(0),
  exclusives: array()
    .when("isCreateSeries", {
      is: true,
      then: (schema) =>
        schema.of(
          object({
            // from: date()
            //     .transform(function (value, originalValue) {
            //         if (this.isType(value)) {
            //             return value;
            //         }
            //         console.log(value);
            //         // const result = parse(originalValue, "dd.MM.yyyy", new Date());
            //         return originalValue;
            //     })
            //     .required("Không bỏ trống."),
            from: string().required("Chọn ngày bắt đầu."),
            to: string().required("Chọn ngày kết thúc."),
          }),
        ),
      otherwise: (schema) => schema.optional(),
    })
    .default([]),
});

export const stockConfirmSchema: ObjectSchema<StockConfirmFormData> = object({
  recId: number().required("recId Bị thiếu."),
  cap: number()
    .required("Số lượng không bỏ trống.")
    .positive("Không phải là số")
    .min(1, "Số lượng tối thiểu lớn hơn 1."),
  description: string().required("Mô tả không bỏ trống"),
  valid: string().required("Không bỏ trống").defined(),
  validTo: string().required("Không bỏ trống").defined(),
  start: string().required("Không bỏ trống").defined(),
  end: string().required("Không bỏ trống").defined(),
});

export const stockAdjustSchema: ObjectSchema<StockAdjustFormData> = object({
  inventoryStockId: number().required("inventoryStockId Bị thiếu."),
  quantity: number().required("Số lượng không bỏ trống."),
  rmk: string().required("Mô tả không bỏ trống"),
});
