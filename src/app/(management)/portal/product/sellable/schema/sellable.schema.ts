import { object, string, ObjectSchema, boolean, number, array } from "yup";

import { SellableFormData } from "@/models/management/core/sellable.interface";
import { SellableApprovalFormData } from "../modules/sellable.interface";

import { SellablePriceConfigFormData } from "../modules/priceConfig.interface";

export const sellableSchema: ObjectSchema<SellableFormData> = object({
  sellableTemplateId: number().required("sellableTemplateId Bị thiếu."),
  isCreateSeries: boolean().default(false),
  type: string().required("Type không bỏ trống."),
  codeAffix: string(),
  cap: number().required("Số lượng không bỏ trống.").min(1, "Tối thiểu lớn hơn 1."),
  valid: string().required("Không bỏ trống"),
  closeDate: string().required("Không bỏ trống"),
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

export const sellableApprovalSchema: ObjectSchema<SellableApprovalFormData> = object({
  recId: number().required("recId Bị thiếu."),
  productType: string().oneOf<"TOUR" | "EXTRA">(["TOUR", "EXTRA"]).required("ProductType không bỏ trống."),
  cap: number().required("Số lượng không bỏ trống.").min(1, "Tối thiểu lớn hơn 1."),
  closeDate: string().required("Không bỏ trống"),
  valid: string().required("Không bỏ trống"),
  validTo: string().required("Không bỏ trống"),
  start: string().required("Không bỏ trống"),
  end: string().required("Không bỏ trống"),
  inventories: array().when("productType", {
    is: "TOUR",
    then: (schema) =>
      schema
        .of(
          object({
            recId: number().required("Thiếu id inventory."),
            qty: number().required("Số lượng không bỏ trống").min(1, "Số lượng không nhỏ hơn 1."),
          }),
        )
        .required("Inventory không bỏ trống."),
    otherwise: (schema) => schema.optional(),
  }),
  stocks: array().when("productType", {
    is: "TOUR",
    then: (schema) =>
      schema
        .of(
          object({
            recId: number().required("Thiếu id stock."),
            qty: number().required("Số lượng không bỏ trống").min(1, "Số lượng không nhỏ hơn 1."),
          }),
        )
        .required("Stock không bỏ trống."),
    otherwise: (schema) => schema.optional(),
  }),
  extraInventories: array().of(
    object({
      recId: number().required("Thiếu id extraInventories."),
      qty: number().required("Số lượng không bỏ trống").min(1, "Số lượng không nhỏ hơn 1."),
    }),
  ),
  extraStocks: array().of(
    object({
      recId: number().required("Thiếu id extraStocks."),
      qty: number().required("Số lượng không bỏ trống").min(1, "Số lượng không nhỏ hơn 1."),
    }),
  ),
});

export const priceConfigSchema: ObjectSchema<Partial<SellablePriceConfigFormData>> = object({
  sellableRecId: number().required("sellableRecId không bỏ trống."),
  tourConfigs: array().of(
    object({
      recId: number().required("RecId không bỏ trống."),
      sellableId: number().required("SellableId không bỏ trống"),
      channel: string().required("channel không bỏ trống"),
      class: string().required("Class không bỏ trống"),
      maxAvailable: number().required("maxAvailable không bỏ trống"),
      adult: number().required("adult không bỏ trống"),
      child: number().required("child không bỏ trống"),
      infant: number().required("infant không bỏ trống"),
      limitPerBooking: number(),
      open: number(),
      sold: number().optional(),
      details: string(),
      sellableDetailsId: number().optional(),
      available: number(),
    }),
  ),
  extraConfigs: array().of(
    object({
      recId: number().required("RecId không bỏ trống."),
      sellableId: number().required("SellableId không bỏ trống"),
      channel: string().required("channel không bỏ trống"),
      class: string().required("Class không bỏ trống"),
      maxAvailable: number().required("maxAvailable không bỏ trống"),
      adult: number().required("adult không bỏ trống"),
      child: number().required("child không bỏ trống"),
      infant: number().required("infant không bỏ trống"),
      limitPerBooking: number(),
      open: number(),
      sold: number().optional(),
      details: string(),
      sellableDetailsId: number().optional(),
      available: number(),
    }),
  ),
});
