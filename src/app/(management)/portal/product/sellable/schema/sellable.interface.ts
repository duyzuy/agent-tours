import { object, string, ObjectSchema, boolean, number, array, date } from "yup";
import { IInventory, IInventoryPayload } from "@/models/management/core/inventory.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import { Status } from "@/models/common.interface";
import { IStock } from "@/models/management/core/stock.interface";
import { ISellable, SellableConfirmFormData, SellableFormData } from "@/models/management/core/sellable.interface";
import { SellablePriceConfigPayload } from "@/models/management/core/priceConfig.interface";

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

export const inventoryDetailSchema: ObjectSchema<Partial<IInventory>> = object({
  recId: number().required("InventoryId bị thiếu."),
  cmsIdentity: string(),
  type: string().oneOf<IInventoryPayload["type"]>([
    EInventoryType.AIR,
    EInventoryType.GUIDE,
    EInventoryType.HOTEL,
    EInventoryType.INSURANCE,
    EInventoryType.LANDPACKAGE,
    EInventoryType.RESTAURANT,
    EInventoryType.TRANSPORT,
    EInventoryType.VISA,
  ]),
  code: string(),
  name: string(),
  supplierId: number(),
  vendorId: number(),
  productType: string()
    .oneOf<IInventoryPayload["productType"]>([EProductType.EXTRA, EProductType.TOUR])
    .required("ProductType không bỏ trống."),
  tourItinerary: string(),
  airItinerary: string(),
  isStock: boolean().default(false),
  status: string()
    .oneOf<IInventoryPayload["status"]>([Status.OK, Status.QQ, Status.XX, Status.OX])
    .required("Trạng thái không bỏ trống."),
  sysFstUser: string(),
  sysLstUser: string(),
  sysFstUpdate: date(),
  sysLstUpdate: date(),
  sysBelongTo: string(),
  logStatus: string(),
});

export const stockSchemaDetail: ObjectSchema<Partial<IStock>> = object({
  recId: number().required("StockId Bị thiếu"),
  cmsIdentity: string(),
  type: string(),
  inventoryId: number(),
  inventoryType: string(),
  cap: number(),
  used: number(),
  open: number(),
  avaiable: number(),
  code: string(),
  description: string(),
  validFrom: string(),
  validTo: string(),
  startDate: string(),
  endDate: string(),
  name: string(),
  supplierId: number(),
  status: string()
    .oneOf<IInventoryPayload["status"]>([Status.OK, Status.QQ, Status.XX, Status.OX])
    .required("Trạng thái không bỏ trống."),
  sysFstUser: string(),
  sysLstUser: string(),
  sysFstUpdate: string(),
  sysLstUpdate: string(),
  sysBelongTo: string(),
  logStatus: string(),
});

export const sellableSchemaDetail: ObjectSchema<Partial<ISellable>> = object({
  recId: number().required("SellableId bị thiếu."),
  type: string(),
  validFrom: string(),
  validTo: string(),
  avaiable: number(),
  cap: number(),
  open: number(),
  used: number(),
  closeDate: string(),
  limitPerBooking: number(),
  code: string(),
  deadlineJson: string(),
  endDate: string(),
  logStatus: string(),
  sellableTemplateId: number(),
  startDate: string(),
  sysBelongTo: string(),
  sysFstUpdate: string(),
  sysFstUser: string(),
  sysLstUser: string(),
  sysLstUpdate: string(),
  status: string()
    .oneOf<IInventoryPayload["status"]>([Status.OK, Status.QQ, Status.XX, Status.OX])
    .required("Trạng thái không bỏ trống."),
});

export const sellableConfirmSchema: ObjectSchema<SellableConfirmFormData> = object({
  recId: number().required("recId Bị thiếu."),
  cap: number().required("Số lượng không bỏ trống.").min(1, "Tối thiểu lớn hơn 1."),
  closeDate: string().required("Không bỏ trống"),
  valid: string().required("Không bỏ trống"),
  validTo: string().required("Không bỏ trống"),
  start: string().required("Không bỏ trống"),
  end: string().required("Không bỏ trống"),
  inventories: array()
    .of(
      object({
        inventory: inventoryDetailSchema,
        qty: number().required("Số lượng không bỏ trống"),
      }),
    )
    .required("Inventory không bỏ trống."),
  stocks: array()
    .of(
      object({
        stock: stockSchemaDetail,
        qty: number().required("Số lượng không bỏ trống"),
      }),
    )
    .required("Stock không bỏ trống."),

  extraInventories: array()
    .of(
      object({
        inventory: inventoryDetailSchema,
        qty: number().required("Số lượng không bỏ trống"),
      }),
    )
    .default([]),
  extraStocks: array()
    .of(
      object({
        stock: stockSchemaDetail,
        qty: number().required("Số lượng không bỏ trống"),
      }),
    )
    .default([]),
  otherSellables: array()
    .of(
      object({
        sellable: sellableSchemaDetail,
        qty: number().required("Số lượng không bỏ trống"),
      }),
    )
    .default([]),
});

export const priceConfigSchema: ObjectSchema<SellablePriceConfigPayload> = object({
  sellableRecId: number().required("sellableRecId không bỏ trống."),
  configs: array()
    .of(
      object({
        recId: number().required("RecId không bỏ trống."),
        sellableId: number().required("SellableId không bỏ trống"),
        channel: string().required("channel không bỏ trống"),
        class: string().required("Class không bỏ trống"),
        maxAvaiable: number().required("maxAvailable không bỏ trống"),
        adult: number().required("adult không bỏ trống"),
        child: number().required("child không bỏ trống"),
        infant: number().required("infant không bỏ trống"),
        open: number().optional(),
        sold: number().optional(),
        sellableDetailsId: number().optional(),
        avaiable: number().optional(),
      }),
    )
    .required("Thieu thong tin config"),
});
