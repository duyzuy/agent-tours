import { BaseResponse } from "@/models/common.interface";
import { EInventoryType } from "../inventoryType.interface";
import { ISellable } from "../sellable.interface";
import { ITemplateSellableDetail } from "../templateSellable.interface";

export interface OperationCostingPayload {
  type?: EInventoryType;
  supplierId?: number;
  operationId?: number;
}

export class OperationCostingParams {
  operationId?: number;
  supplierId?: number;
  type?: EInventoryType;

  constructor(operationId: number | undefined, supplierId: number | undefined, type: EInventoryType | undefined) {
    this.operationId = operationId;
    this.supplierId = supplierId;
    this.type = type;
  }
}

export interface IOperationCosting {
  id: number;
  type: EInventoryType;
  supplierId: number;
  operationId: number;
  sellableId: number;
  sellableCode: string;
  totalCost: number;
  status: string;
  sellableMinimal: Pick<
    ISellable,
    | "recId"
    | "sellableTemplateId"
    | "type"
    | "code"
    | "cap"
    | "open"
    | "used"
    | "available"
    | "closeDate"
    | "validFrom"
    | "validTo"
    | "startDate"
    | "endDate"
  > & {
    sellableTemplateCode: null;
    configs: null;
    sellableDetails: null;
    promotions: null;
  };
  templateMinimal: Pick<
    ITemplateSellableDetail,
    "recId" | "cmsIdentity" | "type" | "code" | "name" | "inventoryTypeList"
  > & {
    cms: null;
    sellables: null;
    cmsMustKnow: null;
  };
  details: null;
}

export interface OperationCostingListResponse extends BaseResponse<IOperationCosting[]> {}
export interface OperationCostingResponse extends BaseResponse<IOperationCosting> {}
