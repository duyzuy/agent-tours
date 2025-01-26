import { BaseResponse } from "@/models/common.interface";
import { EInventoryType } from "../inventoryType.interface";

export interface TourLeader {
  supplier: {
    recId: number;
    shortname: string;
    fullname: string;
  };
  isAvailable: boolean;
}

export interface OperationDutyQueryParams {
  fromDate?: string;
  toDate?: string;
}
export interface UpdateOperationDutyPayload {
  sellableId: number;
  suppliers: {
    supplierId: number;
    remark: string;
  }[];
}

export class OperationDutyFormQueryParams {
  fromDate?: string;
  toDate?: string;

  constructor(fromDate: string | undefined, toDate: string | undefined) {
    this.fromDate = fromDate;
    this.toDate = toDate;
  }
}

export interface OperationDutyListResponse extends BaseResponse<TourLeader[]> {}
export interface UpdateOperationDutyResponse extends BaseResponse<TourLeader> {}
