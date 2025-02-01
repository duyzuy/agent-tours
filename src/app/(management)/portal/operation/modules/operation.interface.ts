import { IOperation, OperationPayload } from "@/models/management/core/operation/operation.interface";
import { IPersonInCharge } from "@/models/management/core/operation/personInCharge.interface";
import { EInventoryType, EStockType } from "@/models/management/core/inventoryType.interface";
import { RoomingType } from "@/models/management/booking/rooming.interface";
import {
  AirCostingDetail,
  GuideCostingDetail,
  HotelCostingDetail,
  TransportCostingDetail,
  VisaCostingDetail,
  InsuranceCostingDetail,
  OperationCostingDetailPayload,
} from "@/models/management/core/operation/operationCostingDetail.interface";
import { InventoryStockTypes } from "@/constants/inventory.constant";

export class OperationFormData implements OperationPayload {
  id?: number;
  pic?: Partial<IPersonInCharge> | undefined;
  sellableCode?: string | undefined;
  sellableId?: number | undefined;

  constructor(
    id: number | undefined,
    pic: Partial<IPersonInCharge> | undefined,
    sellableCode: string | undefined,
    sellableId: number | undefined,
  ) {
    this.id = id;
    this.sellableId = sellableId;
    this.pic = pic;
    this.sellableCode = sellableCode;
  }
}

export class OperationDeadlineFormData {
  id?: number;
  operationId?: number;
  type?: EInventoryType;
  preDeadline?: string;
  deadline?: string;
  remark?: string;
  needRemarkEachPaxToFollow?: boolean;

  constructor(
    id: number | undefined,
    operationId: number | undefined,
    type: EInventoryType | undefined,
    preDeadline: string | undefined,
    deadline: string | undefined,
    remark: string | undefined,
    needRemarkEachPaxToFollow: boolean | undefined,
  ) {
    this.id = id;
    this.operationId = operationId;
    this.type = type;
    this.preDeadline = preDeadline;
    this.deadline = deadline;
    this.remark = remark;
    this.needRemarkEachPaxToFollow = needRemarkEachPaxToFollow;
  }
}

export class OperationCostingFormData {
  type?: EInventoryType;
  supplierId?: number;
  operationId?: number;

  constructor(operationId: number | undefined, type: EInventoryType | undefined, supplierId?: number | undefined) {
    this.type = type;
    this.supplierId = supplierId;
    this.operationId = operationId;
  }
}

export class AirCostingDetailFormData {
  type?: InventoryStockTypes["AIR"];
  details?: AirCostingDetail;

  constructor(type: InventoryStockTypes["AIR"] | undefined, details: AirCostingDetail) {
    this.type = type;
    this.details = details;
  }
}

export class GuideCostingDetailFormData {
  type?: InventoryStockTypes["GUIDE"];
  details?: GuideCostingDetail;

  constructor(type: InventoryStockTypes["GUIDE"] | undefined, details: GuideCostingDetail | undefined) {
    this.type = type;
    this.details = details;
  }
}

export class HotelCostingDetailFormData {
  type?: InventoryStockTypes["HOTEL"];
  details?: HotelCostingDetail;

  constructor(type: InventoryStockTypes["HOTEL"] | undefined, details: HotelCostingDetail | undefined) {
    this.type = type;
    this.details = details;
  }
}

export class InsuranceCostingDetailFormData {
  type?: InventoryStockTypes["INSURANCE"];
  details?: InsuranceCostingDetail;

  constructor(type: InventoryStockTypes["INSURANCE"] | undefined, details: InsuranceCostingDetail | undefined) {
    this.type = type;
    this.details = details;
  }
}

export class LandPackageCostingDetailFormData {
  type?: InventoryStockTypes["LANDPACKAGE"];
  details?: any;

  constructor(type: InventoryStockTypes["LANDPACKAGE"] | undefined, details: any | undefined) {
    this.type = type;
    this.details = details;
  }
}

export class RestauranceCostingDetailFormData {
  type?: InventoryStockTypes["RESTAURANT"];
  details?: any;
  constructor(type: InventoryStockTypes["RESTAURANT"] | undefined, details: any | undefined) {
    this.type = type;
    this.details = details;
  }
}

export class TransportCostingDetailFormData {
  type?: InventoryStockTypes["TRANSPORT"];
  details?: TransportCostingDetail;
  constructor(type: InventoryStockTypes["TRANSPORT"] | undefined, details: TransportCostingDetail | undefined) {
    this.type = type;
    this.details = details;
  }
}

export class VisaCostingDetailFormData {
  type?: InventoryStockTypes["VISA"];
  details?: TransportCostingDetail;

  constructor(type: InventoryStockTypes["VISA"] | undefined, details: TransportCostingDetail | undefined) {
    this.type = type;
    this.details = details;
  }
}

export class OperationCostingDetailFormData {
  costingId?: number;
  costingDetailsId?: number;
  costingDataType?:
    | AirCostingDetailFormData
    | GuideCostingDetailFormData
    | HotelCostingDetailFormData
    | InsuranceCostingDetailFormData
    | LandPackageCostingDetailFormData
    | TransportCostingDetailFormData
    | VisaCostingDetailFormData
    | RestauranceCostingDetailFormData;
  paymentQuantity?: number;
  amount?: number;

  constructor(
    costingId: number | undefined,
    costingDetailsId: number | undefined,
    costingDataType:
      | AirCostingDetailFormData
      | GuideCostingDetailFormData
      | HotelCostingDetailFormData
      | InsuranceCostingDetailFormData
      | LandPackageCostingDetailFormData
      | TransportCostingDetailFormData
      | VisaCostingDetailFormData
      | RestauranceCostingDetailFormData
      | undefined,
    paymentQuantity: number | undefined,
    amount: number | undefined,
  ) {
    this.costingId = costingId;
    this.costingDataType = costingDataType;
    this.paymentQuantity = paymentQuantity;
    this.amount = amount;
    this.costingDetailsId = costingDetailsId;
  }
}
