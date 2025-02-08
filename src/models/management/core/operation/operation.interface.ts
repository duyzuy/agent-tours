import { BaseResponse, PassengerType, PaymentStatus } from "@/models/common.interface";
import { ISellable } from "../sellable.interface";
import { ITemplateSellableDetail } from "../templateSellable.interface";
import { BaseQueryParams } from "@/models/common.interface";
import { IPersonInCharge } from "../personInCharge.interface";

export type IOperationStatus = "NEW" | "DONE" | "ACCEPTED" | "HANDOVERED" | "LOCKED" | "PENDINGCANCELED" | "CANCELED";

export interface IOperation {
  id: number;
  sellableCode: string;
  sellableId: number;
  totalCosting: number;
  totalSale: number;
  pic: IPersonInCharge | null;
  status: IOperationStatus;
  sellableType: "MICE" | "TOUR" | "EXTRA";
  sellable: Pick<
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
    | "endDate"
    | "validFrom"
    | "validTo"
    | "startDate"
  > & {
    configs: null;
    sellableDetails: null;
    promotions: null;
    sellableTemplateCode: null;
  };
  template:
    | (Pick<ITemplateSellableDetail, "recId" | "cmsIdentity" | "type" | "code" | "name" | "inventoryTypeList"> & {
        cms: null;
        sellables: null;
        cmsMustKnow: null;
      })
    | null;
}

export interface OperationPayload {
  id?: number;
  sellableId?: number;
  sellableCode?: string;
  pic?: Partial<IPersonInCharge>;
  status?: IOperationStatus;
}

export type OperationQueryParams = BaseQueryParams<{
  sellableId?: number;
  sellableTemplateId?: number;
  picRecId?: number;
}>;
export class OperationFormQueryParams implements OperationQueryParams {
  requestObject?: { sellableId?: number; sellableTemplateId?: number; picRecId?: number } | undefined;
  orderBy?: { sortColumn?: string; direction?: "asc" | "desc" } | undefined;
  pageCurrent?: number | undefined;
  pageSize?: number | undefined;

  constructor(params: OperationQueryParams) {
    this.requestObject = params.requestObject;
    this.orderBy = params.orderBy;
    this.pageCurrent = params.pageCurrent;
    this.pageSize = params.pageSize;
  }
}

export interface OperationListResponse extends BaseResponse<IOperation[]> {}
export interface OperationResponse extends BaseResponse<IOperation> {}
