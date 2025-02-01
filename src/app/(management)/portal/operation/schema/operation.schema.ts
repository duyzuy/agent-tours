import { ObjectSchema, object, string, array, number, mixed, boolean } from "yup";

import {
  AirCostingDetailFormData,
  OperationCostingDetailFormData,
  OperationCostingFormData,
  OperationFormData,
} from "../modules/operation.interface";
import { OperationDeadlineFormData } from "../modules/operation.interface";
import { EInventoryType, EStockType } from "@/models/management/core/inventoryType.interface";
import { InventoryStockTypes } from "@/constants/inventory.constant";
import {
  AirCostingDetail,
  GuideCostingDetail,
  HotelCostingDetail,
  TransportCostingDetail,
  VisaCostingDetail,
} from "@/models/management/core/operation/operationCostingDetail.interface";

export const operationSchema: ObjectSchema<OperationFormData> = object({
  id: number(),
  pic: object({
    recId: number().required("ID user không bỏ trống"),
    fullname: string(),
    email: string(),
    username: string(),
    phoneNumber: string(),
  }),
  sellableCode: string(),
  sellableId: number().required("SellableId không hợp lệ."),
  status: string().oneOf<"NEW" | "DONE">(["NEW"]),
});

export const operationCreateDeadlineSchema: ObjectSchema<OperationDeadlineFormData> = object({
  id: number().when("action", {
    is: "update",
    then: (schema) => {
      return schema.required("ID không bỏ trống");
    },
  }),
  action: string().oneOf<"create" | "update">(["create", "update"]),
  operationId: number().required("ID operation không bỏ trống"),
  type: string()
    .oneOf<EInventoryType>(
      [
        EInventoryType.AIR,
        EInventoryType.GUIDE,
        EInventoryType.HOTEL,
        EInventoryType.INSURANCE,
        EInventoryType.LANDPACKAGE,
        EInventoryType.RESTAURANT,
        EInventoryType.TRANSPORT,
        EInventoryType.VISA,
      ],
      "Type không hợp lệ",
    )
    .required("Không bỏ trống"),
  preDeadline: string().required("PreDateline không bỏ trống"),
  needRemarkEachPaxToFollow: boolean(),
  deadline: string().required("Deadline không bỏ trống"),
  remark: string(),
});

export const operationCostingSchema: ObjectSchema<OperationCostingFormData> = object({
  operationId: number().required("ID operation không bỏ trống"),
  type: string()
    .oneOf<EInventoryType>(
      [
        EInventoryType.AIR,
        EInventoryType.GUIDE,
        EInventoryType.HOTEL,
        EInventoryType.INSURANCE,
        EInventoryType.LANDPACKAGE,
        EInventoryType.RESTAURANT,
        EInventoryType.TRANSPORT,
        EInventoryType.VISA,
      ],
      "Type không hợp lệ",
    )
    .required("Không bỏ trống"),
  supplierId: number().required("preDateline không bỏ trống"),
});

export const operationCostingDetailSchema: ObjectSchema<OperationCostingDetailFormData> = object({
  costingId: number().required("Thiếu Costing ID."),
  costingDetailsId: number(),
  costingDataType: object<
    AirCostingDetail | HotelCostingDetail | TransportCostingDetail | GuideCostingDetail | VisaCostingDetail
  >(),
  paymentQuantity: number().required("Số lượng không bỏ trống"),
  amount: number().required("Số tiền không bỏ trống"),
});

export const airCostingDetailSchema: ObjectSchema<AirCostingDetailFormData> = object({
  type: string().oneOf<InventoryStockTypes["AIR"]>([EStockType.AIRTICKET, EStockType.OTHER, EStockType.INSURANCE]),
  details: object<AirCostingDetail>({
    classOfService: string(),
    tripType: string()
      .oneOf<"ONEWAY" | "ROUNDTRIP" | "MULTICITY">(["ONEWAY", "ROUNDTRIP", "MULTICITY"])
      .required("Không bỏ trống."),
    adult: number(),
    child: number(),
    infant: number(),
    fullItinerary: string(),
    departureDate: string(),
    arrivalDate: string(),
  }),
});

export const updateOperationDutySchema: ObjectSchema<{
  sellableId: number;
  suppliers: { supplierId: number; fullname?: string; shortname?: string; remark: string }[];
}> = object({
  sellableId: number().required("Không bỏ trống"),
  suppliers: array()
    .of(
      object({
        supplierId: number().required("Thiếu Id supplier"),
        fullname: string(),
        shortname: string(),
        remark: string().default(""),
      }),
    )
    .default([]),
});
